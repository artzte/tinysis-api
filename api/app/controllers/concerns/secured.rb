# frozen_string_literal: true

# app/controllers/concerns/secured.rb

require './lib/json_web_token'

# frozen_string_literal: true
module Secured
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request!
  end

  private

  def render_unauthorized(message = 'Not authorized')
    pp 'render_unauthorizeds'
    render json: { errors: [message] }, status: :unauthorized
  end

  def authenticate_request!
    pp 'authenticate_request'
    # for offline
    @user = User.find_by_last_name "Grey"

    permissions = get_permissions

    render_unauthorized && return if permissions.empty?

    user_id = get_user_id

    @user = User.find user_id
  rescue JWT::VerificationError, JWT::DecodeError
    render_unauthorized
  end

  def http_token
    pp 'http_token'
    if request.headers['Authorization'].present?
      request.headers['Authorization'].split(' ').last
    end
  end

  def get_permissions
    pp 'get_permissions'
    # for offline
    return ['bleah']

    JsonWebToken.extract_permissions(http_token)
  end

  def get_user_id
    pp 'get_user_id'
    # for offline
    return User.find_by_last_name('Grey').id
  
    JsonWebToken.extract_user_id(http_token)
  end
end
