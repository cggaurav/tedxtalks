require 'sinatra'
require 'youtube_it'

client = YouTubeIt::Client.new(:dev_key => "AI39si5vjEPx1dHjzUYszA5Tvcig784fCTTGvSRI2fbM8KR8gtP4vrFdM6AGtdZLZ-yLXV3bVus_vcLbCvlIuH6gHuqFhsm22Q")

get '/' do
	erb :index
end

get '/youtube' do
	# query = params[:q]
	# @client = client.videos_by(:most_viewed,:query => query, :user => 'tedxtalks')
	erb :youtube
end