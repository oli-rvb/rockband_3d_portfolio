# Git Guide for Your Portfolio Project

## What is Git?

Git is a **version control system** - think of it as a time machine for your code. It allows you to:
- **Track changes** in your files over time
- **Save snapshots** (called "commits") of your project at different stages
- **Go back** to previous versions if something breaks
- **Collaborate** with others without overwriting each other's work
- **Branch** to work on features without affecting the main code

## Key Concepts

### 1. **Repository (Repo)**
A repository is your project folder that Git tracks. It contains all your files and the history of changes.

### 2. **Commit**
A commit is a snapshot of your project at a specific point in time. It's like saving a checkpoint in a video game.

### 3. **Branch**
A branch is a separate line of development. The default branch is usually called `main` or `master`. You can create branches to work on features without affecting the main code.

### 4. **Staging Area**
Before committing, you "stage" files (add them to the staging area). This lets you choose exactly what changes to include in a commit.

### 5. **Remote Repository** (Optional)
A remote repository is a copy of your project stored on a server (like GitHub, GitLab, or Bitbucket). It allows you to backup your code and collaborate with others. **You don't need this for local-only Git usage!**

## Installation

### macOS (Your System)

Git is already installed on your system! ✅

If you ever need to reinstall or update it:

**Option 1: Using Homebrew (Recommended)**
```bash
brew install git
```

**Option 2: Using Xcode Command Line Tools**
```bash
xcode-select --install
```

**Option 3: Download from official website**
Visit: https://git-scm.com/download/mac

### Verify Installation
```bash
git --version
```

## Basic Git Workflow

### 1. **Check Status**
See what files have changed:
```bash
git status
```

### 2. **Stage Files**
Add files to the staging area:
```bash
git add .                    # Add all changed files
git add filename.js          # Add a specific file
git add src/                 # Add all files in a directory
```

### 3. **Commit Changes**
Save a snapshot with a message:
```bash
git commit -m "Your descriptive message here"
```

### 4. **View History**
See all your commits:
```bash
git log
```

### 5. **Create a Branch**
Work on a new feature:
```bash
git branch feature-name       # Create branch
git checkout feature-name     # Switch to branch
# OR in one command:
git checkout -b feature-name  # Create and switch
```

### 6. **Merge Branches**
Combine your feature branch back into main:
```bash
git checkout main
git merge feature-name
```

## Setting Up Your First Repository

### Step 1: Configure Git (One-time setup)
Set your name and email:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 2: Initialize Repository (Already Done!)
```bash
git init
```

### Step 3: Add Files
```bash
git add .
```

### Step 4: Make Your First Commit
```bash
git commit -m "Initial commit: portfolio project setup"
```

## Using Git Locally Only (No Remote Needed!)

**Great news**: Git works perfectly fine without any remote repository! You can use all Git features locally:

✅ **What you CAN do locally:**
- Track all your file changes
- Create commits (save snapshots)
- View complete history of changes
- Create branches for different features
- Switch between versions
- Undo changes
- See what changed between commits

❌ **What you WON'T have without a remote:**
- Online backup (but you can backup the `.git` folder yourself)
- Collaboration with others
- Access from other computers

**For local-only usage, you only need:**
```bash
git add .
git commit -m "Your message"
git log
git branch
```

That's it! No GitHub, no remote setup needed.

---

## Connecting to GitHub (Optional - Only if You Want Online Backup)

**Skip this section if you want to keep everything local!**

### Step 1: Create a GitHub Account
Visit: https://github.com

### Step 2: Create a New Repository
- Click "New repository"
- Name it (e.g., "BSH_portfolio")
- Don't initialize with README (since you already have files)
- Click "Create repository"

### Step 3: Connect Your Local Repository
GitHub will show you commands. They'll look like:
```bash
git remote add origin https://github.com/yourusername/BSH_portfolio.git
git branch -M main
git push -u origin main
```

## Common Commands Cheat Sheet

```bash
# Status and Information
git status                    # See what's changed
git log                       # View commit history
git log --oneline            # Compact history view
git diff                      # See changes in files

# Staging and Committing
git add .                     # Stage all changes
git add filename              # Stage specific file
git commit -m "message"       # Commit with message
git commit -am "message"      # Add and commit in one step (only for tracked files)

# Branching
git branch                    # List branches
git branch name               # Create branch
git checkout name             # Switch branch
git checkout -b name         # Create and switch
git merge name                # Merge branch into current

# Remote Operations
git remote add origin URL     # Add remote repository
git push origin main          # Upload commits to remote
git pull origin main          # Download changes from remote
git clone URL                 # Copy repository from remote

# Undoing Changes
git restore filename          # Discard changes in working directory
git restore --staged filename # Unstage a file
git reset --soft HEAD~1       # Undo last commit, keep changes staged
git reset --hard HEAD~1       # Undo last commit, discard changes (careful!)
```

## Best Practices

1. **Commit Often**: Make small, frequent commits rather than large ones
2. **Write Good Commit Messages**: Be descriptive (e.g., "Add contact form validation" not "fix stuff")
3. **Don't Commit Sensitive Data**: Never commit passwords, API keys, or personal information
4. **Use .gitignore**: This file (already created) tells Git which files to ignore
5. **Pull Before Push**: Always pull latest changes before pushing your own
6. **Review Before Committing**: Use `git status` and `git diff` to review changes

## Your Project's .gitignore

I've created a `.gitignore` file that excludes:
- `node_modules/` - Dependencies (can be reinstalled)
- `dist/` - Build output (can be regenerated)
- `.DS_Store` - macOS system files
- `.env` - Environment variables (may contain secrets)
- Log files and editor settings

## Next Steps (Local-Only Workflow)

1. **Make your first commit:**
   ```bash
   git add .
   git commit -m "Initial commit: 3D portfolio project"
   ```

2. **Start using Git regularly** - commit after each feature or significant change:
   ```bash
   git add .
   git commit -m "Add new feature"
   ```

3. **View your history anytime:**
   ```bash
   git log
   ```

4. **That's it!** You're using Git locally. No GitHub needed.

**Optional:** If you ever want online backup later, you can add a remote repository at any time. But for now, everything stays on your computer!

## Getting Help

- View help for any command: `git help <command>`
- Example: `git help commit`
- Official documentation: https://git-scm.com/doc

---

**Remember**: Git is powerful but forgiving. You can always undo mistakes, so don't be afraid to experiment!

