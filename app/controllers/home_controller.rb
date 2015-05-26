class HomeController < ApplicationController
	def index
    @categories = Category.order(:name).all
		@projects = Project.where(deleted_at: nil, stopped_at: nil)
                    .where().not(launched_at: nil)
                    .where("deadline > :now", { now: Time.zone.now }).take(3)
  end

	def about
		
	end
	
end
