async function fetchGitHubData() {
  const searchInput = document.getElementById("search-input");
  const username = searchInput.value.trim();

  if (!username) {
    alert("Please enter a GitHub username");
    return;
  }

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    const userData = await userResponse.json();

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = await reposResponse.json();

    const userInfoContainer = document.getElementById("user-info");
    userInfoContainer.innerHTML = `
        <img src="${userData.avatar_url}" alt="${
      userData.login
    }'s Avatar" style="width: 100px; height: 100px; border-radius: 50%;">
        <p><strong>Username:</strong> ${userData.login}</p>
        <p><strong>Name:</strong> ${userData.name || "N/A"}</p>
        <p><strong>URL:</strong> <a href="${
          userData.html_url
        }" target="_blank">${userData.html_url}</a></p>
      `;

    const reposContainer = document.getElementById("repos-container");
    reposContainer.innerHTML = "";

    repos.forEach((repo) => {
      const repoElement = document.createElement("p");
      repoElement.innerHTML = `<strong>Repository:</strong> <a href="${repo.html_url}" target="_blank">${repo.name}</a><br>`;
      reposContainer.appendChild(repoElement);
    });
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
  }
}
