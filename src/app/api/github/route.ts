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
    const username = searchParams.get('username') || process.env.GITHUB_USERNAME;
    
    if (!username) {
      return Response.json({ error: 'GitHub username is required' }, { status: 400 });
    }

    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'Portfolio-App',
        'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!userResponse.ok) {
      return Response.json({ error: 'Failed to fetch GitHub user data' }, { status: 500 });
    }

    const userData: GitHubUser = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`, {
      headers: {
        'User-Agent': 'Portfolio-App',
        'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!reposResponse.ok) {
      return Response.json({ error: 'Failed to fetch GitHub repositories' }, { status: 500 });
    }

    const reposData: GitHubRepo[] = await reposResponse.json();

    // Calculate stats
    const totalStars = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.forks_count, 0);
    const repositories = reposData.length;

    // Get non-forked repositories
    const originalRepos = reposData.filter((repo: GitHubRepo) => !repo.fork);

    // For commits, we need to fetch from each repository's commits
    // This is a simplified approach - in reality, you'd want to limit this due to API rate limits
    let totalCommits = 0;
    for (const repo of originalRepos.slice(0, 10)) { // Limit to first 10 repos to avoid rate limits
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
          totalCommits += commitsData.length;
        }
      } catch (error) {
        console.error(`Error fetching commits for ${repo.name}:`, error);
        // Continue with other repos even if one fails
      }
    }

    // Fetch pull requests
    const prsResponse = await fetch(`https://api.github.com/search/issues?q=type:pr+author:${username}`, {
      headers: {
        'User-Agent': 'Portfolio-App',
        'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    });

    let totalPRs = 0;
    if (prsResponse.ok) {
      const prsData = await prsResponse.json();
      totalPRs = prsData.total_count || 0;
    }

    // Fetch issues
    const issuesResponse = await fetch(`https://api.github.com/search/issues?q=type:issue+author:${username}`, {
      headers: {
        'User-Agent': 'Portfolio-App',
        'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    });

    let totalIssues = 0;
    if (issuesResponse.ok) {
      const issuesData = await issuesResponse.json();
      totalIssues = issuesData.total_count || 0;
    }

    // Prepare open source projects data
    const openSourceProjects = originalRepos
      .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6) // Top 6 projects
      .map((repo: GitHubRepo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description provided',
        stars: repo.stargazers_count,
        language: repo.language || 'Unknown',
        url: repo.html_url,
        updatedAt: repo.updated_at,
      }));

    // Prepare personal tools data - this would typically come from a different source
    // For now, we'll use mock data that represents personal tools
    const personalTools: PersonalTool[] = [
      {
        id: 1,
        name: 'Code Formatter',
        description: 'Personal VS Code extension for formatting',
        type: 'VS Code Extension'
      },
      {
        id: 2,
        name: 'Terminal Theme',
        description: 'Custom terminal theme for developers',
        type: 'Theme'
      },
      {
        id: 3,
        name: 'CLI Tool',
        description: 'Command line tool for project scaffolding',
        type: 'CLI Tool'
      }
    ];

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
      openSourceProjects,
      personalTools, // Add personal tools to the response
      user: {
        username: userData.login,
        name: userData.name,
        bio: userData.bio,
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