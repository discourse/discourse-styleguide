module DiscourseStyleguide
  class StyleguideController < ApplicationController
    requires_plugin DiscourseStyleguide::PLUGIN_NAME
    skip_before_action :check_xhr

    def index
      render 'default/empty'
    end
  end
end
