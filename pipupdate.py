import subprocess


def update_requirements():
    # Paketleri güncellemek için
    with open("requirements.txt") as f:
        packages = f.read().splitlines()

    # Paketleri güncelleme işlemi
    for package in packages:
        subprocess.run(["pip", "install", "--upgrade", package])


if __name__ == "__main__":
    update_requirements()
