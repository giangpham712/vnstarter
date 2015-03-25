module ApplicationHelper
  def page_title(page_title)
    content_for :page_title, "#{page_title} - VnStarter"
  end

  def body_id(body_id)
    content_for :body_id, body_id.to_s
  end

  def capitalize_first_letter(key)
    t(key).mb_chars.capitalize.to_s
  end

  def capitalize(key)
    t(key).capitalize.to_s
  end
end
