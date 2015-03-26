class DiscoverController < ApplicationController
	def index
    @projects = Project.where(deleted_at: nil, stopped_at: nil).where().not(launched_at: nil)
  end

	def show
    @projects = Project.where(deleted_at: nil, stopped_at: nil).where().not(launched_at: nil)
	end
	
end
