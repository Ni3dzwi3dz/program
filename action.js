import core from "@actions/core";

import submitProgram from "./scripts/submitProgram.js";
import autoCreateIssue from "./scripts/autoCreateIssue.js";
import autoTrackIssue from "./scripts/autoTrackIssue.js";
import autoAssignIssue from "./scripts/autoAssignIssue.js";

// main action function
(async () => {
  try {
    console.log("Hii there !!!");

    // get action default data
    const OWNER = await core.getInput("OWNER");
    const REPO = await core.getInput("REPO");

    const TOKEN = await core.getInput("TOKEN");

    const USERNAME = await core.getInput("USERNAME");
    const ISSUE_NUMBER = await core.getInput("ISSUE_NUMBER");
    const ISSUE_BODY = await core.getInput("ISSUE_BODY");
    const ISSUE_TITLE = await core.getInput("ISSUE_TITLE");
    const ISSUE_LABEL = await core.getInput("ISSUE_LABEL");

    const SUBMIT_PROGRAM = await core.getInput("SUBMIT_PROGRAM");
    const AUTO_CREATE_ISSUE = await core.getInput("AUTO_CREATE_ISSUE");
    const AUTO_TRACK_ISSUE = await core.getInput("AUTO_TRACK_ISSUE");
    const AUTO_ASSIGN_ISSUE = await core.getInput("AUTO_ASSIGN_ISSUE");

    if (SUBMIT_PROGRAM === "true") {
      await submitProgram(
        OWNER,
        REPO,
        TOKEN,
        USERNAME,
        ISSUE_NUMBER,
        ISSUE_TITLE,
        ISSUE_BODY,
        ISSUE_LABEL
      );
    }

    if (AUTO_CREATE_ISSUE === "true") {
      await autoCreateIssue(OWNER, REPO, TOKEN);
    }

    if (AUTO_TRACK_ISSUE === "true") {
      await autoTrackIssue(
        OWNER,
        REPO,
        TOKEN,
        ISSUE_NUMBER,
        ISSUE_TITLE,
        ISSUE_BODY
      );
    }

    if (AUTO_ASSIGN_ISSUE === "true") {
      await autoAssignIssue(OWNER, REPO, TOKEN, ISSUE_NUMBER, USERNAME);
    }

    // end of main function
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
