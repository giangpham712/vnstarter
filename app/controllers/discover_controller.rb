class DiscoverController < ApplicationController
	def index
    @categories = Category.order(:name).all
    @projects = Project.where(deleted_at: nil, stopped_at: nil).where().not(launched_at: nil)
  end

  def category_projects
    @category = Category.friendly.find(params[:id])
    @projects = @category.projects.where(deleted_at: nil, stopped_at: nil).where().not(launched_at: nil)
  end
	
end
