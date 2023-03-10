class DiscoverController < ApplicationController
	def index
    @categories = Category.order(:name).all
    @projects = Project.where(deleted_at: nil, stopped_at: nil)
                    .where().not(launched_at: nil)
                    .where("deadline > :now", { now: Time.zone.now })


    gon.staff_picked_projects = Project.group(:category_id)

  end

  def category_projects
    @category = Category.friendly.find(params[:id])
    @projects = @category.projects.where(deleted_at: nil, stopped_at: nil)
                    .where().not(launched_at: nil)
                    .where("deadline > :now", { now: Time.zone.now })
  end
	
end
