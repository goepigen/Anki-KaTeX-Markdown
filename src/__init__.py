import os
import shutil

from .HTMLandCSS import front, back, front_cloze, back_cloze, css
from aqt import mw
from anki.hooks import addHook
import anki

from pathlib import Path

# Load bundled JS into a string
BUNDLE_PATH = Path(__file__).parent.parent / "dist" / "editor.bundle.js"
HTMLforEditor = BUNDLE_PATH.read_text(encoding="utf-8")

MODEL_NAME = "KaTeX and Markdown"
CONF_NAME = "MDKATEX"

def build_cloze_card_html(front_fields, back_fields, bundle_name="card.bundle.js"):
    body = "\n".join(
        f"<div id="mdkatex-{field.loewr()}"><pre>{{{{{cloze:Text}}}}}}</pre></div>"
        for field in front_fields
    )
    if back_fields:
    body += f'\n<div id="extra"><pre>{{Back Extra}}</pre></div>'
    
    script = f'<script src="{bundle_name}"></script>'
    return f"{body}\n{script}"


def build_card_html(front_fields, back_fields=[], bundle_name="card.bundle.js"):
    body = "\n".join(
        f"<div id='mdkatex-{field.lower()}'><pre>{{{{{field}}}}}</pre></div>"
        for field in front_fields
    )

    if back_fields:
        body += '<hr id="answer" />\n' + "\n".join(
            f"<div id='mdkatex-{field.lower()}'><pre>{{{{{field}}}}}</pre></div>"
            for field in back_fields
        )

    script = f'<script src="{bundle_name}"></script>'
    return f"{body}\n{script}"


def build_cloze_html(fields, bundle_name="_card.bundle.js"):
    body = "\n".join(
        f"<div id='mdkatex-{field.lower()}'><pre>{{{{cloze:{field}}}}}</pre></div>"
        for field in fields
    )
    script = f'<script src="{bundle_name}"></script>'
    return f"{body}\n{script}"


def markdownPreview(editor):
    """This function runs when the user opens the editor, creates the markdown preview area"""
    if editor.note.model()["name"] in [MODEL_NAME + " Basic", MODEL_NAME + " Cloze"]:
        editor.web.eval(HTMLforEditor)
        editor.web.eval(
            """
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerText = `
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                pre code {
                    background-color: #eee;
                    border: 1px solid #999;
                    display: block;
                    padding: 20px;
                    overflow: auto;
                }`;
            document.head.appendChild(style);
        """
        )
    else:  # removes the markdown preview
        editor.web.eval(
            """
					var area = document.getElementById('markdown-area');
					if(area) area.remove();
        """
        )


addHook("loadNote", markdownPreview)


def create_model_if_necessacy():
    """
    Runs when the user opens Anki, creates the two card types and also handles updating
    the card types CSS and HTML if the addon has a pending update
    """
    model = mw.col.models.byName(MODEL_NAME + " Basic")
    model_cloze = mw.col.models.byName(MODEL_NAME + " Cloze")

    if not model:
        create_model()
    if not model_cloze:
        create_model_cloze()

    update()


def create_model():
    """Creates the Basic Card type"""
    m = mw.col.models
    model = m.new(MODEL_NAME + " Basic")

    field = m.newField("Front")
    m.addField(model, field)

    field = m.newField("Back")
    m.addField(model, field)

    template = m.newTemplate(MODEL_NAME + " Basic")
    template["qfmt"] = build_card_html(["Front"])
    template["afmt"] = build_card_html(["Front"], ["Back"])
    model["css"] = css

    m.addTemplate(model, template)
    m.add(model)
    m.save(model)


def create_model_cloze():
    """Creates the Cloze Card type"""
    m = mw.col.models
    model = m.new(MODEL_NAME + " Cloze")
    model["type"] = anki.consts.MODEL_CLOZE

    field = m.newField("Text")
    m.addField(model, field)

    field = m.newField("Back Extra")
    m.addField(model, field)

    template = m.newTemplate(MODEL_NAME + " Cloze")
    template["qfmt"] = ["Text"]
    template["afmt"] = ["Text", "Back Extra"]
    model["css"] = css

    m.addTemplate(model, template)
    m.add(model)
    m.save(model)


def update():
    """Updates the card types the addon has a pending update"""
    model = mw.col.models.byName(MODEL_NAME + " Basic")
    model_cloze = mw.col.models.byName(MODEL_NAME + " Cloze")

    # Commented out since I don't want to overwrite the user's individual changes right now
    # model['tmpls'][0]['qfmt'] = front
    # model['tmpls'][0]['afmt'] = back
    # model['css'] = css

    # model_cloze['tmpls'][0]['qfmt'] = front_cloze
    # model_cloze['tmpls'][0]['afmt'] = back_cloze
    # model_cloze['css'] = css

    # mw.col.models.save(model)
    # mw.col.models.save(model_cloze)

    # clean up old assets from Anki's media collection folder
    if os.path.isdir(os.path.join(mw.col.media.dir(), "_katex")):
        shutil.rmtree(os.path.join(mw.col.media.dir(), "_katex"))

    if os.path.isdir(os.path.join(mw.col.media.dir(), "_markdown-it")):
        shutil.rmtree(os.path.join(mw.col.media.dir(), "_markdown-it"))

    # Copy assets from assets/ to Anki's media collection folder
    assets_addon_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "assets")
    )
    dist_addon_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "dist")
    )
    _add_file(os.path.join(assets_addon_path, "_katex.min.js"), "_katex.min.js")
    _add_file(os.path.join(assets_addon_path, "_katex.css"), "_katex.css")
    _add_file(os.path.join(assets_addon_path, "_auto-render.js"), "_auto-render.js")
    _add_file(
        os.path.join(assets_addon_path, "_markdown-it.min.js"), "_markdown-it.min.js"
    )
    _add_file(os.path.join(assets_addon_path, "_highlight.css"), "_highlight.css")
    _add_file(os.path.join(assets_addon_path, "_highlight.js"), "_highlight.js")
    _add_file(os.path.join(assets_addon_path, "_mhchem.js"), "_mhchem.js")
    _add_file(
        os.path.join(assets_addon_path, "_markdown-it-mark.js"), "_markdown-it-mark.js"
    )

    _add_file(os.path.join(dist_addon_path, "card.bundle.js"), "card.bundle.js")

    for katex_font in os.listdir(os.path.join(assets_addon_path, "fonts")):
        _add_file(os.path.join(assets_addon_path, "fonts", katex_font), katex_font)


def _add_file(path, filename):
    if not os.path.isfile(os.path.join(mw.col.media.dir(), filename)):
        mw.col.media.add_file(path)


addHook("profileLoaded", create_model_if_necessacy)
