const lc = (number, slug) => ({ number, url: `https://leetcode.com/problems/${slug}/` })

export const SHEETS = [
  {
    id: 'sheet-01',
    label: 'Sheet 01',
    title: 'Weekly Interview Preparation',
    questions: [
      { key: 'dsa-1', category: 'DSA', difficulty: 'Easy', title: 'Two Sum', leetcode: lc(1, 'two-sum') },
      {
        key: 'dsa-2',
        category: 'DSA',
        difficulty: 'Easy',
        title: 'Remove Duplicates from Sorted Array',
        leetcode: lc(26, 'remove-duplicates-from-sorted-array'),
      },
      { key: 'dsa-3', category: 'DSA', difficulty: 'Easy', title: 'Move Zeroes', leetcode: lc(283, 'move-zeroes') },
      { key: 'dsa-4', category: 'DSA', difficulty: 'Medium', title: 'Rotate Array', leetcode: lc(189, 'rotate-array') },
      { key: 'dsa-5', category: 'DSA', difficulty: 'Medium', title: '3Sum', leetcode: lc(15, '3sum') },

      {
        key: 'git-1',
        category: 'Git',
        difficulty: 'Medium',
        title: 'Wrong Branch, Correct Work',
        prompt:
          'You accidentally made 4 commits on main instead of your feature branch. How would you move the work to the correct branch without losing it?',
        followUps: [
          'Would your approach change if the commits were already pushed to the remote?',
          'When would you use cherry-pick here?',
          'What would you do if teammates were already using main?',
        ],
      },
      {
        key: 'git-2',
        category: 'Git',
        difficulty: 'Medium',
        title: 'Merge Conflict During PR',
        prompt:
          'Your feature branch has a merge conflict with main just before the PR is merged. Walk through the complete process of resolving it safely.',
        followUps: [
          'How do you verify that the conflict resolution did not break existing functionality?',
          'Would you merge main into the feature branch or rebase? Explain the trade-off.',
          'What should you do before pushing the resolved branch?',
        ],
      },
      {
        key: 'git-3',
        category: 'Git',
        difficulty: 'Medium',
        title: 'Secret Accidentally Committed',
        prompt:
          'A developer committed an API key to GitHub and immediately realizes the mistake. What steps should they take?',
        followUps: [
          'Why is deleting the commit/file not enough?',
          'What should happen to the exposed key itself?',
          'How would you prevent similar secrets from being committed again?',
        ],
      },
      {
        key: 'git-4',
        category: 'Git',
        difficulty: 'Medium',
        title: 'PR Review With New Changes',
        prompt:
          'A reviewer asks for changes on your pull request after you have already pushed several commits. How would you update the PR while keeping the review understandable?',
        followUps: [
          'Would you create a new commit or amend/squash?',
          'When can force-push become risky?',
          'How would you communicate a significant change to the reviewer?',
        ],
      },
      {
        key: 'git-5',
        category: 'Git',
        difficulty: 'Medium',
        title: 'Recovering Lost Local Work',
        prompt:
          "You ran a Git command incorrectly and your local branch no longer points to the commit containing yesterday's work. How would you investigate and recover it?",
        followUps: [
          'What is git reflog and why can it help?',
          'How would you verify the recovered commit before changing the branch?',
          'What habit would reduce the chance of permanent loss?',
        ],
      },

      {
        key: 'tech-1',
        category: 'Technical',
        difficulty: 'Medium',
        title: 'JavaScript — Async Flow',
        prompt:
          "You call an API using fetch(), update the UI after the response, and also have a setTimeout() in the same flow. Explain how JavaScript's event loop affects the order of execution.",
        followUps: [
          'What is the difference between a microtask and a macrotask?',
          'Where do Promise callbacks fit?',
          'Why can blocking synchronous JavaScript make the UI feel frozen?',
        ],
      },
      {
        key: 'tech-2',
        category: 'Technical',
        difficulty: 'Medium',
        title: 'React — Unnecessary Re-render',
        prompt:
          'A React page becomes slow because a parent component re-renders frequently and several child components also re-render. How would you investigate and improve it?',
        followUps: [
          'When would React.memo help?',
          'What are useMemo and useCallback actually solving?',
          'Why should you avoid adding memoization everywhere?',
        ],
      },
      {
        key: 'tech-3',
        category: 'Technical',
        difficulty: 'Medium',
        title: 'REST API + Express — Request Flow',
        prompt:
          'A protected GET /api/profile endpoint is returning 401 for a logged-in user. Explain the complete request flow and how you would debug it.',
        followUps: [
          'Where should authentication middleware run?',
          'How would you distinguish an authentication failure from an authorization failure?',
          'Which HTTP status codes would you use for 401 and 403?',
        ],
      },
      {
        key: 'tech-4',
        category: 'Technical',
        difficulty: 'Medium',
        title: 'MongoDB + Mongoose — Duplicate Data',
        prompt:
          'Your registration API is allowing two users to register with the same email under a race condition. How would you prevent and handle duplicate records?',
        followUps: [
          'Would application-level checking alone be sufficient?',
          'How can a unique index help?',
          'How should the API respond when a duplicate-key error occurs?',
        ],
      },
      {
        key: 'tech-5',
        category: 'Technical',
        difficulty: 'Medium',
        title: 'Authentication + Authorization + ImageKit',
        prompt:
          "A student is authenticated but should not be allowed to access another student's private resource or upload area. Design the checks you would apply before allowing the request, and explain where ImageKit fits into the upload flow.",
        followUps: [
          'What is the difference between authentication and authorization?',
          'What information should the server trust from the client?',
          'How would you prevent a user from changing an ID in the URL and accessing someone else\'s data?',
        ],
      },
    ],
  },
]
