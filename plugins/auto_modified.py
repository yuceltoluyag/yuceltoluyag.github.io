import os
import subprocess
from datetime import datetime
from pelican import signals

ARTICLE_DIRS = []  # Pelican ayarlarından yüklenecek

def get_git_modified(path):
    try:
        output = subprocess.check_output(
            ["git", "log", "-1", "--format=%ci", path],
            universal_newlines=True
        )
        if output.strip():
            return datetime.strptime(output.strip().split(" +")[0], "%Y-%m-%d %H:%M:%S")
    except Exception:
        pass
    return None

def get_file_mtime(path):
    try:
        mtime = os.path.getmtime(path)
        return datetime.fromtimestamp(mtime)
    except Exception:
        return None

def update_file_metadata(path, new_value):
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        lines = f.readlines()

    modified_index = None
    changed = False

    # Var olan Modified satırını bul
    for i, line in enumerate(lines):
        if line.lower().startswith("modified:"):
            modified_index = i
            break

    if modified_index is not None:
        old_value = lines[modified_index].split(":", 1)[1].strip()
        if old_value != new_value:
            lines[modified_index] = f"Modified: {new_value}\n"
            print(f"[UPDATED] {path} → {new_value}")
            changed = True
        else:
            print(f"[UNCHANGED] {path}")
    else:
        # Date satırının hemen altına ekle
        insert_index = 0
        for i, line in enumerate(lines):
            if line.lower().startswith("date:"):
                insert_index = i + 1
                break
        lines.insert(insert_index, f"Modified: {new_value}\n")
        print(f"[ADDED] {path} → {new_value}")
        changed = True

    # Sadece değişiklik varsa dosyaya yaz → gereksiz döngü engellenir
    if changed:
        with open(path, "w", encoding="utf-8", errors="replace") as f:
            f.writelines(lines)

def set_modified(instance):
    # source_path yoksa veya string değilse çık
    if not hasattr(instance, 'source_path') or not isinstance(instance.source_path, str):
        return

    # .md değilse çık
    if not instance.source_path.lower().endswith(".md"):
        return

    # Sadece ARTICLE_PATHS altındaki dosyalara uygula
    if ARTICLE_DIRS:
        if not any(instance.source_path.startswith(article_dir) for article_dir in ARTICLE_DIRS):
            return

    modified_time = get_git_modified(instance.source_path) or get_file_mtime(instance.source_path)
    if not modified_time:
        return

    new_value = modified_time.strftime('%Y-%m-%d %H:%M')
    old_value = instance.metadata.get('modified')

    if isinstance(old_value, datetime):
        old_dt = old_value
    elif isinstance(old_value, str):
        try:
            old_dt = datetime.strptime(old_value, '%Y-%m-%d %H:%M')
        except ValueError:
            old_dt = None
    else:
        old_dt = None

    if not old_value:
        instance.metadata['modified'] = new_value
        update_file_metadata(instance.source_path, new_value)
    elif old_dt and modified_time > old_dt:
        instance.metadata['modified'] = new_value
        update_file_metadata(instance.source_path, new_value)
    elif not old_dt:
        instance.metadata['modified'] = new_value
        update_file_metadata(instance.source_path, new_value)

def init_article_dirs(pelicanobj):
    """Pelican config’inden ARTICLE_PATHS’i mutlak yola çevirerek al"""
    global ARTICLE_DIRS
    base_path = pelicanobj.settings.get("PATH", "")
    article_paths = pelicanobj.settings.get("ARTICLE_PATHS", ["articles"])
    ARTICLE_DIRS = [os.path.abspath(os.path.join(base_path, p)) for p in article_paths]

def register():
    signals.initialized.connect(init_article_dirs)
    signals.content_object_init.connect(set_modified)
