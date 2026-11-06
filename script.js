
const searchForm = document.getElementById("searchForm");
const usernameInput = document.getElementById("username");
const searchButton = document.getElementById("searchButton");

const message = document.getElementById("message");
const profile = document.getElementById("profile");

const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const profileLink = document.getElementById("profileLink");

// Event ketika form dikirim
searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();

    if (!username) {
        message.textContent = "Masukkan username GitHub!";
        profile.classList.add("hidden");
        return;
    }

    // Menampilkan loading
    message.textContent = "Loading... Sedang mencari profil.";
    profile.classList.add("hidden");
    searchButton.disabled = true;
    searchButton.textContent = "Mencari...";

    try {
        // Mengambil data dari GitHub API
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}`
        );

        // Jika username tidak ditemukan
        if (response.status === 404) {
            message.textContent = "User tidak ditemukan!";
            return;
        }

        // Jika request gagal
        if (!response.ok) {
            throw new Error("Terjadi kesalahan saat mengambil data.");
        }

        // Mengubah response menjadi JSON
        const data = await response.json();

        // Menampilkan data profil
        avatar.src = data.avatar_url;
        avatar.alt = `Avatar ${data.login}`;

        name.textContent = data.name || data.login;
        bio.textContent = data.bio || "Tidak ada bio.";

        repos.textContent = data.public_repos;

        profileLink.href = data.html_url;

        // Menampilkan profil
        profile.classList.remove("hidden");
        message.textContent = "Profil berhasil ditemukan!";

    } catch (error) {
        message.textContent = "Gagal mengambil data. Periksa koneksi internet Anda.";
        console.error(error);

    } finally {
        // Mengembalikan tombol seperti semula
        searchButton.disabled = false;
        searchButton.textContent = "Cari Profil";
    }
});
