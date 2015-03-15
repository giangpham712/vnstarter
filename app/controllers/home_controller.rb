class HomeController < ApplicationController
  def index
    @project3= Project.last(3)
  end
end
