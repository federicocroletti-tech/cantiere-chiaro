from html.parser import HTMLParser
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
MARKDOWN_LINK = re.compile(r"!?\[([^\]]*)\]\(([^)]+)\)")


class LandingPageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.html_language = None
        self.title = []
        self.in_title = False
        self.headings = []
        self.main_count = 0
        self.links = []
        self.images_without_alt = []
        self.current_link = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "html":
            self.html_language = attributes.get("lang")
        elif tag == "title":
            self.in_title = True
        elif tag == "main":
            self.main_count += 1
        elif re.fullmatch(r"h[1-6]", tag):
            self.headings.append(int(tag[1]))
        elif tag == "img" and "alt" not in attributes:
            self.images_without_alt.append("img")
        elif tag == "a":
            self.current_link = {
                "text": [],
                "aria_label": attributes.get("aria-label", ""),
                "href": attributes.get("href", ""),
            }

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "a" and self.current_link is not None:
            self.links.append(self.current_link)
            self.current_link = None

    def handle_data(self, data):
        if self.in_title:
            self.title.append(data.strip())
        if self.current_link is not None:
            self.current_link["text"].append(data.strip())


def markdown_files():
    return sorted(path for path in ROOT.rglob("*.md") if ".git" not in path.parts)


def check_markdown_links(files):
    errors = []
    for source in files:
        content = source.read_text(encoding="utf-8")
        for match in MARKDOWN_LINK.finditer(content):
            label, raw_target = match.groups()
            target = raw_target.split(maxsplit=1)[0].strip("<>")
            if not label.strip():
                errors.append(f"{source.relative_to(ROOT)}: empty Markdown link text")
                continue
            parsed = urlsplit(target)
            if parsed.scheme or target.startswith("//") or not parsed.path:
                continue
            linked_path = Path(unquote(parsed.path))
            resolved = (source.parent / linked_path).resolve()
            try:
                resolved.relative_to(ROOT)
            except ValueError:
                errors.append(
                    f"{source.relative_to(ROOT)}: link escapes repository: {target}"
                )
                continue
            if not resolved.exists():
                errors.append(
                    f"{source.relative_to(ROOT)}: missing local link target: {target}"
                )
    return errors


def check_landing_page():
    page = ROOT / "index.html"
    parser = LandingPageParser()
    parser.feed(page.read_text(encoding="utf-8"))
    errors = []
    if parser.html_language != "it":
        errors.append("index.html: <html> must declare lang=\"it\"")
    if len("".join(parser.title).strip()) == 0:
        errors.append("index.html: <title> must not be empty")
    if parser.main_count != 1:
        errors.append("index.html: expected exactly one <main> landmark")
    if parser.headings.count(1) != 1:
        errors.append("index.html: expected exactly one <h1>")
    previous = 0
    for level in parser.headings:
        if previous and level > previous + 1:
            errors.append(f"index.html: heading level skips from h{previous} to h{level}")
        previous = level
    for link in parser.links:
        if not link["aria_label"].strip() and not "".join(link["text"]).strip():
            errors.append("index.html: link has no accessible name")
    if parser.images_without_alt:
        errors.append("index.html: images must declare alternative text")
    return errors


def main():
    files = markdown_files()
    errors = check_markdown_links(files)
    errors.extend(check_landing_page())
    if errors:
        print("\n".join(f"ERROR: {error}" for error in errors))
        return 1
    print(f"Documentation checks passed: {len(files)} Markdown files and index.html.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
