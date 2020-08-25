const execa = require("execa");

module.exports = async ({ github, context }) => {
  const { stdout } = await execa("git", [
    "log",
    "--no-merges",
    `--pretty='format:"%h: %b"'`,
    `${context.payload.pull_request.base.sha}..${context.payload.pull_request.head.sha}`
  ]);
  const issue_numbers = new Set();
  const matches = stdout.match(/#([\d]+)/g);
  console.log(matches);
  if (matches) {
    for (const issue of matches) {
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
  }
};
