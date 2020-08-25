const execa = require("execa");

module.exports = async (github, context) => {
  const { stdout } = await execa("git", [
    "log",
    "--no-merges",
    `--pretty='format:"%h: %b"'`,
    `master..${context.ref}`
  ]);
  const issue_numbers = new Set();
  for (const issue of stdout.match(/#([\d]+)/g)) {
    issue_numbers.add(issue.split("#")[1]);
  }
  console.log(issue_numbers);

  const releaseLog = [];
  for (const issue_number of issue_numbers) {
    const { data } = await github.issues.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number
    });
    if (!data.labels.some((label) => label.name === "development")) {
      releaseLog.push(`- [X] ${data.title} #${data.number}`);
    }
  }
  return releaseLog.join("\r\n");
};
