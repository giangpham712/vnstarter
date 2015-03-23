class DiscoverController < ApplicationController
	def index
		@projects = Project.where(launched_at: nil, deleted_at: nil, stopped_at: nil)
	end
	def show
		 @projects = Project.where(launched_at: nil, deleted_at: nil, stopped_at: nil)
	end
end
