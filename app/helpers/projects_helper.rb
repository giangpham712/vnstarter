module ProjectsHelper

  def cache_key_for_project(project)
    "projects/#{project.id}-#{project.updated_at}"
  end

  def cache_key_for_project_posts(project)
    "projects/#{project.id}/posts/all"
  end

  def cache_key_for_project_rewards(project)
    "projects/#{project.id}/rewards/all"
  end

end
