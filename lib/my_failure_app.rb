class MyFailureApp < Devise::FailureApp
  def redirect_url
    if warden_message == :timeout
      flash[:timedout] = true

      path = if request.get?
               attempted_path
             else
               request.referrer
             end

      path || scope_url
    else
      scope_url + "?" + { :then => attempted_path }.to_query
    end

  end

end