class DiscoverController < ApplicationController
	def index
		@projects=Project.take(4)
	end
	def show
		@projects=Project.all
	end
end
