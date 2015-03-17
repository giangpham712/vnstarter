class DiscoverController < ApplicationController
	def index
		@projects=Project.take(3)
	end
	def show
		@projects=Project.all
	end
end
