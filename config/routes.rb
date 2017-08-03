DiscourseStyleguide::Engine.routes.draw do
  get "/" => 'styleguide#index'
  get "/:guide" => 'styleguide#index'
end
