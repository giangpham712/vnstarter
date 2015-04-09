module ProjectsHelper

  def cache_key_for_project(project)
    "/products/#{project.id}-#{project.updated_at}"
  end

  def cache_key_for_project_rewards(project)
    "/products/#{project.id}/rewards"
  end

end
