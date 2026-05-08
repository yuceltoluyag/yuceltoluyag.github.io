import subprocess
import sys


def update_requirements():
    # Paketleri güncellemek için requirements.txt dosyasını oku
    try:
        with open("requirements.txt") as f:
            packages = [
                line.strip() for line in f 
                if line.strip() and not line.startswith("#")
            ]
    except FileNotFoundError:
        print("Error: requirements.txt not found.")
        return

    # Paketleri güncelleme işlemi
    for package in packages:
        # Pinned versiyonları temizleyip en güncelini kurmak için paketin sadece adını alıyoruz
        package_name = package.split('==')[0].split('>=')[0].split('<')[0].split('>')[0].strip()
        print(f"Updating {package_name}...")
        subprocess.run([sys.executable, "-m", "pip", "install", "--upgrade", package_name])


if __name__ == "__main__":
    update_requirements()
