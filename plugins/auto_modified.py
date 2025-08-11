import os
import subprocess
from datetime import datetime
from pelican import signals

ARTICLE_DIRS = []  # Pelican ayarlarından yüklenecek

def get_git_modified(path):
    """Bir dosyanın Git'te SON DEĞİŞTİRİLDİĞİ tarihi alır (sadece o dosya için)"""
    try:
        # Sadece bu dosyayı etkileyen son commit'i bul
        output = subprocess.check_output(
            ["git", "log", "-1", "--format=%ci", "--follow", path],
            universal_newlines=True
        )
        if output.strip():
            return datetime.strptime(output.strip().split(" +")[0], "%Y-%m-%d %H:%M:%S")
    except Exception as e:
        print(f"Git hatası ({path}): {e}")
    return None

def get_git_file_last_change(path):
    """Dosyanın son değiştirildiği commit'in tarihini al (daha kesin yöntem)"""
    try:
        # Bu dosyayı değiştiren son commit'in hash'ini al
        hash_output = subprocess.check_output(
            ["git", "log", "-1", "--format=%H", path],
            universal_newlines=True
        ).strip()

        if not hash_output:
            return None

        # O commit'te bu dosyanın gerçekten değişip değişmediğini kontrol et
        diff_output = subprocess.check_output(
            ["git", "show", "--name-only", "--format=", hash_output],
            universal_newlines=True
        )

        # Eğer bu dosya o commit'te değiştiyse, commit tarihini al
        if os.path.basename(path) in diff_output:
            date_output = subprocess.check_output(
                ["git", "show", "-s", "--format=%ci", hash_output],
                universal_newlines=True
            ).strip()
            return datetime.strptime(date_output.split(" +")[0], "%Y-%m-%d %H:%M:%S")

    except Exception as e:
        print(f"Git gelişmiş sorgu hatası ({path}): {e}")
    return None

def get_file_mtime(path):
    """Dosya sistemi modification time'ı al"""
    try:
        mtime = os.path.getmtime(path)
        return datetime.fromtimestamp(mtime)
    except Exception:
        return None

def update_file_metadata(path, new_value):
    """Dosyanın metadata'sındaki Modified alanını güncelle"""
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            lines = f.readlines()
    except Exception as e:
        print(f"Dosya okuma hatası ({path}): {e}")
        return False

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
            print(f"[UPDATED] {os.path.basename(path)} → {new_value}")
            changed = True
        else:
            print(f"[UNCHANGED] {os.path.basename(path)}")
    else:
        # Date satırının hemen altına ekle
        insert_index = 0
        for i, line in enumerate(lines):
            if line.lower().startswith("date:"):
                insert_index = i + 1
                break
        lines.insert(insert_index, f"Modified: {new_value}\n")
        print(f"[ADDED] {os.path.basename(path)} → {new_value}")
        changed = True

    # Sadece değişiklik varsa dosyaya yaz → gereksiz döngü engellenir
    if changed:
        try:
            with open(path, "w", encoding="utf-8", errors="replace") as f:
                f.writelines(lines)
            return True
        except Exception as e:
            print(f"Dosya yazma hatası ({path}): {e}")
            return False

    return False

def set_modified(instance):
    """Ana işlev: dosyanın modified tarihini belirle ve güncelle"""
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

    # Dosya mevcut değilse çık
    if not os.path.exists(instance.source_path):
        return

    # Önce kesin Git yöntemini dene, sonra basit yöntemi, son olarak dosya sistemi zamanını
    modified_time = (get_git_file_last_change(instance.source_path) or
                    get_git_modified(instance.source_path) or
                    get_file_mtime(instance.source_path))

    if not modified_time:
        print(f"[SKIP] {os.path.basename(instance.source_path)} - Zaman bilgisi alınamadı")
        return

    new_value = modified_time.strftime('%Y-%m-%d %H:%M')
    old_value = instance.metadata.get('modified')

    # Mevcut değeri datetime'a çevir
    if isinstance(old_value, datetime):
        old_dt = old_value
    elif isinstance(old_value, str):
        try:
            old_dt = datetime.strptime(old_value, '%Y-%m-%d %H:%M')
        except ValueError:
            old_dt = None
    else:
        old_dt = None

    # Güncelleme koşulları
    should_update = False

    if not old_value:
        # Hiç modified değeri yoksa ekle
        should_update = True
        print(f"[REASON] {os.path.basename(instance.source_path)} - Modified değeri yok, ekleniyor")
    elif old_dt and modified_time > old_dt:
        # Dosya gerçekten yeni değiştirildiyse güncelle
        should_update = True
        print(f"[REASON] {os.path.basename(instance.source_path)} - Dosya güncellendi ({old_dt} → {modified_time})")
    elif not old_dt:
        # Eski değer parse edilemiyorsa güncelle
        should_update = True
        print(f"[REASON] {os.path.basename(instance.source_path)} - Eski değer geçersiz")

    if should_update:
        instance.metadata['modified'] = new_value
        update_file_metadata(instance.source_path, new_value)

def init_article_dirs(pelicanobj):
    """Pelican config'inden ARTICLE_PATHS'i mutlak yola çevirerek al"""
    global ARTICLE_DIRS
    base_path = pelicanobj.settings.get("PATH", "")
    article_paths = pelicanobj.settings.get("ARTICLE_PATHS", ["articles"])
    ARTICLE_DIRS = [os.path.abspath(os.path.join(base_path, p)) for p in article_paths]
    print(f"[INFO] Article dizinleri: {ARTICLE_DIRS}")

def register():
    """Plugin'i kaydet"""
    signals.initialized.connect(init_article_dirs)
    signals.content_object_init.connect(set_modified)