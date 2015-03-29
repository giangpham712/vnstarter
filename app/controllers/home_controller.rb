class HomeController < ApplicationController
	def index
		@projects = Project.where(deleted_at: nil, stopped_at: nil).where().not(launched_at: nil).take(3)
  end

	def about
		
	end
	
end
