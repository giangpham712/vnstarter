module ApplicationHelper
  def page_title(page_title)
    content_for :page_title, page_title.to_s
  end

  def capitalize_first_word_letter(input)
    input.mb_chars.capitalize.to_s
  end

  def capitalize(input)
    input.capitalize.to_s
  end
end
