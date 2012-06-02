require 'youtube_it'
client = YouTubeIt::Client.new
client = YouTubeIt::Client.new(:dev_key => "AI39si5vjEPx1dHjzUYszA5Tvcig784fCTTGvSRI2fbM8KR8gtP4vrFdM6AGtdZLZ-yLXV3bVus_vcLbCvlIuH6gHuqFhsm22Q")

client.videos_by(:query => "penguin", :user => 'TEDxtalks').videos.each do |i|
	puts i.unique_id
	puts i.description
	puts i.title
end