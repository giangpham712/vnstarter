class DiscoverController < ApplicationController
	def index
		@projects=Project.all
	end
end
