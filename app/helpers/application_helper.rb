module ApplicationHelper
  def page_title(page_title)
    content_for :page_title, page_title.to_s
  end
end
