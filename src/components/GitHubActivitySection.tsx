'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

// Define TypeScript interfaces
interface GitHubStats {
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  repositories: number;
}

interface OpenSourceProject {
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  updatedAt: string;
}

interface PersonalTool {
  id: number;
  name: string;
  description: string;
  type: string;
}

interface GitHubData {
  stats: GitHubStats;
  openSourceProjects: OpenSourceProject[];
  personalTools: PersonalTool[];
  user: {
    username: string;
    name: string | null;
    bio: string | null;
    followers: number;
    following: number;
    publicRepos: number;
    profileUrl: string;
    avatarUrl: string;
  };
}

const GitHubActivitySection = () => {
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    totalStars: 0,
    totalCommits: 0,
    totalPRs: 0,
    totalIssues: 0,
    repositories: 0
  });
  
  const [openSourceProjects, setOpenSourceProjects] = useState<OpenSourceProject[]>([
    {
      id: 1,
      name: 'Loading...',
      description: 'Loading repository details...',
      stars: 0,
      language: 'Loading...',
      url: '#',
      updatedAt: ''
    }
  ]);
  
  const [personalTools, setPersonalTools] = useState<PersonalTool[]>([
    {
      id: 1,
      name: 'Loading...',
      description: 'Loading tools...',
      type: 'Loading...'
    }
  ]);
  
  const [loading, setLoading] = useState(true);

  // Function to fetch GitHub stats from API route
  const fetchGitHubStats = async () => {
    try {
      // In a real implementation, you would fetch from the API route
      const response = await fetch(`/api/github?username=${process.env.NEXT_PUBLIC_GITHUB_USERNAME || process.env.GITHUB_USERNAME || 'your-github-username'}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub data');
      }
      
      const data: GitHubData = await response.json();
      
      setGithubStats(data.stats);
      setOpenSourceProjects(data.openSourceProjects);
      setPersonalTools(data.personalTools); // Set personal tools from API response
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchGitHubStats();
    };
    
    fetchData();
  }, []);

  return (
    <AnimatedSection>
      <div className="py-20 px-4" id="github">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            GitHub Activity & Open Source
          </motion.h2>
          
          <motion.p 
            className="text-center text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My contributions to the open-source community and development tools
          </motion.p>

          {/* GitHub Stats */}
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-12 border border-gray-700"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">GitHub Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{githubStats.totalStars}</div>
                <div className="text-gray-400">Stars</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{githubStats.totalCommits}</div>
                <div className="text-gray-400">Commits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{githubStats.totalPRs}</div>
                <div className="text-gray-400">Pull Requests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{githubStats.totalIssues}</div>
                <div className="text-gray-400">Issues</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{githubStats.repositories}</div>
                <div className="text-gray-400">Repos</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Open Source Contributions */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">.opensource</span> Open Source Contributions
              </h3>
              <div className="space-y-6">
                {openSourceProjects.map((project: OpenSourceProject, index: number) => (
                  <motion.div
                    key={project.id}
                    className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-semibold text-white">{project.name}</h4>
                        <p className="text-gray-400 mt-2">{project.description}</p>
                      </div>
                      <div className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-gray-300">{project.stars}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                        {project.language}
                      </span>
                      <a 
                        href={project.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        View Repository →
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Personal Tools */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">🛠️</span> Personal Tools & Mods
              </h3>
              <div className="space-y-6">
                {personalTools.map((tool: PersonalTool, index: number) => (
                  <motion.div
                    key={tool.id}
                    className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                  >
                    <h4 className="text-xl font-semibold text-white">{tool.name}</h4>
                    <p className="text-gray-400 mt-2">{tool.description}</p>
                    <div className="mt-4">
                      <span className="text-sm text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                        {tool.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default GitHubActivitySection;