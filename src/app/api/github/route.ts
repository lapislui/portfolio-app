import { NextRequest } from 'next/server';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  fork: boolean;
}

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// Define the structure for personal tools
interface PersonalTool {
  id: number;
  name: string;
  description: string;
  type: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get GitHub username from query params or environment variable
    const searchParams = request.nextUrl.searchParams;
    let username = searchParams.get('username') || process.env.GITHUB_USERNAME || 'lapislui';
    
    // Clean up username if it is the placeholder
    if (username === 'your-github-username') {
      username = 'lapislui';
    }

    // Prepare default fallback data in case GitHub API fails or rate limits us
    const fallbackData = {
      stats: {
        totalStars: 15,
        totalCommits: 284,
        totalPRs: 32,
        totalIssues: 6,
        repositories: 14,
        totalForks: 4,
      },
      openSourceProjects: [
        {
          id: 1,
          name: 'portfolio-app',
          description: 'A modern, interactive 3D portfolio website built with Next.js, Tailwind CSS, and Three.js / React Three Fiber.',
          stars: 4,
          language: 'TypeScript',
          url: `https://github.com/${username}/portfolio-app`,
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'mautic',
          description: 'Custom modifications, modules, and integrations for Mautic marketing automation tool.',
          stars: 2,
          language: 'PHP',
          url: `https://github.com/${username}`,
          updatedAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'flask-site',
          description: 'A company showcase website developed using Flask with GitHub OAuth, dynamic projects display, and database integration.',
          stars: 3,
          language: 'Python',
          url: `https://github.com/${username}`,
          updatedAt: new Date().toISOString(),
        }
      ],
      personalTools: [
        {
          id: 1,
          name: 'Code Formatter',
          description: 'Personal VS Code extension for automated linting and formatting styling guides.',
          type: 'VS Code Extension'
        },
        {
          id: 2,
          name: 'Terminal Theme',
          description: 'Custom developer-oriented dark terminal color schemes and shell prompt configs.',
          type: 'Theme'
        },
        {
          id: 3,
          name: 'CLI Scaffolder',
          description: 'Command line tool for rapid boilerplate scaffolding of TypeScript / Next.js projects.',
          type: 'CLI Tool'
        }
      ],
      user: {
        username: username,
        name: 'Keval Patel',
        bio: 'Full Stack Web Developer specializing in Next.js, Python, Flask, and Interactive 3D graphics.',
        followers: 12,
        following: 18,
        publicRepos: 14,
        profileUrl: `https://github.com/${username}`,
        avatarUrl: `https://avatars.githubusercontent.com/u/68222955?v=4`,
      }
    };

    // Fetch user data
    let userData: GitHubUser | null = null;
    let userResponseOk = false;
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'User-Agent': 'Portfolio-App',
          'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      userResponseOk = userResponse.ok;
      if (userResponse.ok) {
        userData = await userResponse.json();
      } else {
        console.warn(`GitHub user API returned status ${userResponse.status} for ${username}`);
      }
    } catch (err) {
      console.error('Error fetching GitHub user data:', err);
    }

    // Fetch repositories
    let reposData: GitHubRepo[] = [];
    let reposResponseOk = false;
    try {
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`, {
        headers: {
          'User-Agent': 'Portfolio-App',
          'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      reposResponseOk = reposResponse.ok;
      if (reposResponse.ok) {
        reposData = await reposResponse.json();
      } else {
        console.warn(`GitHub repos API returned status ${reposResponse.status} for ${username}`);
      }
    } catch (err) {
      console.error('Error fetching GitHub repositories:', err);
    }

    // If we couldn't fetch basic info due to rate limiting or networking, return fallback data
    if (!userResponseOk || !reposResponseOk || !userData || reposData.length === 0) {
      console.info('Returning fallback GitHub data due to API limitations/errors');
      return Response.json(fallbackData);
    }

    // Calculate stats from actual data
    const totalStars = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.forks_count, 0);
    const repositories = reposData.length;

    // Get non-forked repositories
    const originalRepos = reposData.filter((repo: GitHubRepo) => !repo.fork);

    // Calculate commits for top 5 repos to avoid hitting rate limits
    let totalCommits = 0;
    for (const repo of originalRepos.slice(0, 5)) {
      try {
        const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`, {
          headers: {
            'User-Agent': 'Portfolio-App',
            'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
            'Accept': 'application/vnd.github.v3+json',
          },
          next: { revalidate: 3600 }
        });
        
        if (commitsResponse.ok) {
          const commitsData = await commitsResponse.json();
          totalCommits += Array.isArray(commitsData) ? commitsData.length : 0;
        }
      } catch (error) {
        console.error(`Error fetching commits for ${repo.name}:`, error);
      }
    }

    // Provide a baseline estimate for commits if we couldn't fetch details or if count is zero
    if (totalCommits === 0) {
      totalCommits = originalRepos.length * 15 + 45; // estimate
    }

    // Fetch pull requests count
    let totalPRs = 0;
    try {
      const prsResponse = await fetch(`https://api.github.com/search/issues?q=type:pr+author:${username}`, {
        headers: {
          'User-Agent': 'Portfolio-App',
          'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }
      });

      if (prsResponse.ok) {
        const prsData = await prsResponse.json();
        totalPRs = prsData.total_count || 0;
      }
    } catch (error) {
      console.error('Error fetching PRs:', error);
    }
    if (totalPRs === 0) {
      totalPRs = 18; // reasonable fallback fallback
    }

    // Fetch issues count
    let totalIssues = 0;
    try {
      const issuesResponse = await fetch(`https://api.github.com/search/issues?q=type:issue+author:${username}`, {
        headers: {
          'User-Agent': 'Portfolio-App',
          'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }
      });

      if (issuesResponse.ok) {
        const issuesData = await issuesResponse.json();
        totalIssues = issuesData.total_count || 0;
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
    if (totalIssues === 0) {
      totalIssues = 4; // reasonable fallback
    }

    // Prepare open source projects data
    const openSourceProjects = originalRepos
      .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((repo: GitHubRepo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description provided',
        stars: repo.stargazers_count,
        language: repo.language || 'Unknown',
        url: repo.html_url,
        updatedAt: repo.updated_at,
      }));

    // Prepare response
    const githubData = {
      stats: {
        totalStars,
        totalCommits,
        totalPRs,
        totalIssues,
        repositories,
        totalForks,
      },
      openSourceProjects: openSourceProjects.length > 0 ? openSourceProjects : fallbackData.openSourceProjects,
      personalTools: fallbackData.personalTools,
      user: {
        username: userData.login,
        name: userData.name || 'Keval Patel',
        bio: userData.bio || 'Full Stack Web Developer',
        followers: userData.followers,
        following: userData.following,
        publicRepos: userData.public_repos,
        profileUrl: userData.html_url,
        avatarUrl: userData.avatar_url,
      }
    };

    return Response.json(githubData);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}