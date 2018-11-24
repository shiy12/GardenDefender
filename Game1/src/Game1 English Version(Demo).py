# coding: utf-8
# Author: Charles

import pygame
from pygame.locals import *
import math   # For calculating spining angle
import random # For its Random function

# Initialize pygame, set up game window
pygame.init()
width, height = 640, 480
screen = pygame.display.set_mode((width, height))
# Array keys: used to record player's input [W,A,S,D]
keys = [False, False, False, False]
# Array playerpos: player character's location
playerpos = [100, 100]
# Array acc: acc=[number of bullets been shoot, number of enemies been hit]
# Will be used later to calculate player's accuracy
acc = [0, 0]
# Array arrows: used to store projectiles
arrows = []
# Defines a timer, create a new enemy after certain time
badtimer = 100
badtimer1 = 0
badguys = [[640, 100]]
healthvalue = 194
# Initialize audio
pygame.mixer.init()

# Load player character imagedud
rabbit_img = pygame.image.load("resources/images/dude.png")
# Load backgroud image
grass_img = pygame.image.load("resources/images/grass.png")
castle_img = pygame.image.load("resources/images/castle.png")
# Load projectile image
arrow_img = pygame.image.load('resources/images/bullet.png')
# Load ememies images
badguy_img1 = pygame.image.load("resources/images/badguy.png")
badguy_img = badguy_img1
# Load healthbar images
healthbar_img = pygame.image.load("resources/images/healthbar.png")
health_img = pygame.image.load("resources/images/health.png")
# Load victory and failure image
gameover_img = pygame.image.load("resources/images/gameover.png")
youwin_img = pygame.image.load("resources/images/youwin.png")
# Load audios and set volumn 
hit = pygame.mixer.Sound("resources/audio/explode.wav")
enemy = pygame.mixer.Sound("resources/audio/enemy.wav")
shoot = pygame.mixer.Sound("resources/audio/shoot.wav")
hit.set_volume(0.05)
enemy.set_volume(0.05)
shoot.set_volume(0.05)
# Load background music and looping it
pygame.mixer.music.load('resources/audio/moonlight.wav')
pygame.mixer.music.play(-1, 0.0)
pygame.mixer.music.set_volume(0.25)

# Looping through the following code
# Variable running: defines if the game continues
# Variable exitcode: defines if player wins
running = True
exitcode = False
while running:
	# Fill the screen with black
	screen.fill(0)
	for x in range(width//grass_img.get_width()+1):
		for y in range(height//grass_img.get_height()+1):
			screen.blit(grass_img, (x*100, y*100))
	screen.blit(castle_img, (0, 30))
	screen.blit(castle_img, (0, 135))
	screen.blit(castle_img, (0, 240))
	screen.blit(castle_img, (0, 345))
	# Get cursor's location and player character's location, use atan2 function to calculate angle and radian
	# Calculate new position and display on the screen when player changes orientation
	position = pygame.mouse.get_pos()
	angle = math.atan2(position[1]-(playerpos[1]+32), position[0]-(playerpos[0]+26))
	playerrot = pygame.transform.rotate(rabbit_img, 360-angle*57.29)
	playerpos1 = (playerpos[0]-playerrot.get_rect().width/2, playerpos[1]-playerrot.get_rect().height/2)
	screen.blit(playerrot, playerpos1)
	# Display projectile on the screen
	# Variable velx: velocity at x-axis, calculated using trigonometric function
	# 10 is the projectile's speed
	# If statement used to check if projectile goes out of window
	# If yes, remove the projectile
	# Second for loop used to display the rotating of projectile
	for bullet in arrows:
		index = 0
		velx = math.cos(bullet[0])*10
		vely = math.sin(bullet[0])*10
		bullet[1] += velx
		bullet[2] += vely
		if bullet[1]<-64 or bullet[1]>640 or bullet[2]<-64 or bullet[2]>480:
			arrows.pop(index)
		index += 1
		for projectile in arrows:
			arrow1 = pygame.transform.rotate(arrow_img, 360-projectile[0]*57.29)
			screen.blit(arrow1, (projectile[1], projectile[2]))
	# Update and display emenies
	# Check if timer badtimer equals 0, if yes, create a new enemy and reset badtimer
	# Fiest for loop used to update enemy's x-position, remove enemy if it goes out of window
	# Second for loop used to display all enemies
	if badtimer == 0:
		badguys.append([640, random.randint(50, 430)])
		badtimer = 100 -(badtimer1*2)
		if badtimer1 >= 35:
			badtimer1 = 35
		else:
			badtimer1 += 5
	index_badguy = 0
	for badguy in badguys:
		if badguy[0] < -64:
			badguys.pop(index_badguy)
		badguy[0] -= 7
		# Deal damage to healthbar when enemy reaches castle
		# If enemy's distance with left border goes under 64, remove enemy and deal damage
		# Damage delt is a random number between 5 and 20
		badrect = pygame.Rect(badguy_img.get_rect())
		badrect.top = badguy[1]
		badrect.left = badguy[0]
		if badrect.left < 64:
			hit.play()
			healthvalue -= random.randint(5, 20)
			badguys.pop(index_badguy)
		# Looping through all projectiles and enemies to check if projectile hit enemy
		# If hits, remove projectile and enemy, add 1 to variable acc(accuracy)
		# Use PyGame build-in function to check if two matrices intersect
		index_arrow = 0
		for bullet in arrows:
			bulletrect = pygame.Rect(arrow_img.get_rect())
			bulletrect.left = bullet[1]
			bulletrect.top = bullet[2]
			if badrect.colliderect(bulletrect):
				enemy.play()
				acc[0] += 1
				badguys.pop(index_badguy)
				arrows.pop(index_arrow)
			index_arrow += 1
		index_badguy += 1
	for badguy in badguys:
		screen.blit(badguy_img, badguy)
	# Add a new timer
	# Display time information using font 24
	font = pygame.font.Font(None, 24)
	survivedtext = font.render(str((90000-pygame.time.get_ticks())//60000)+":"+
							   str((90000-pygame.time.get_ticks())//1000%60).zfill(2), True, (0,0,0))
	textRect = survivedtext.get_rect()
	textRect.topright=[635,5]
	screen.blit(survivedtext, textRect)
	# Display healthbar
	# Starting by filling with red, add green based on healthvalue
	screen.blit(healthbar_img, (5, 5))
	for health1 in range(healthvalue):
		screen.blit(health_img, (health1+8, 8))
		
	# Update window
	pygame.display.flip()
	# Check if there's new events, if there's a exit command, terminate game
	for event in pygame.event.get():
		if event.type == pygame.QUIT:
			pygame.quit()
			exit()
		# Store player's inputs into corresponding arrays
		if event.type == pygame.KEYDOWN:
			if event.key == K_w:
				keys[0] = True
			elif event.key == K_a:
				keys[1] = True
			elif event.key == K_s:
				keys[2] = True
			elif event.key == K_d:
				keys[3] = True
		if event.type == pygame.KEYUP:
			if event.key == K_w:
				keys[0] = False
			elif event.key == K_a:
				keys[1] = False
			elif event.key == K_s:
				keys[2] = False
			elif event.key == K_d:
				keys[3] = False
		# Shoot a projectile when player click the mouse
		# Check if mouse is clicked
		# If yes, get cursor location and calculate projectile angle based on player's position and curser's position
		# projectile angle is stores in array arrows[]
		if event.type == pygame.MOUSEBUTTONDOWN:
			shoot.play()
			position = pygame.mouse.get_pos()
			acc[1] += 1
			arrows.append([math.atan2(position[1]-(playerpos1[1]+32), position[0]-(playerpos1[0]+26)),
						   playerpos1[0]+32, playerpos1[1]+26])
	# Move palyer character using values in arrays
	if keys[0]:
		playerpos[1] -= 5
	elif keys[2]:
		playerpos[1] += 5
	if keys[1]:
		playerpos[0] -= 5
	elif keys[3]:
		playerpos[0] += 5
	badtimer -= 1

	
	# Below are winning/losing conditions:
	# If times is up(90s), terminate game and exit
	# If healthbar goes below 0 , terminate game and exit
	# Calculate accuracy all the time
	# First if statement checks if time is up
	# Second if statement checks if healthbar goes below 0
	# Thrid if statement calculate accuracy
	# Last statement check if player wins/loses the game, display winning/losing message
	if pygame.time.get_ticks() >= 90000:
		running = False
		exitcode = True
	if healthvalue <= 0:
		running = False
		exitcode = False
	if acc[1] != 0:
		accuracy = acc[0]*1.0/acc[1]*100
		accuracy = ("%.2f" % accuracy)
	else:
		accuracy = 0
if exitcode == False:
	pygame.font.init()
	font = pygame.font.Font(None, 24)
	text = font.render("Accuracy: "+str(accuracy)+"%", True, (255,0,0))
	textRect = text.get_rect()
	textRect.centerx = screen.get_rect().centerx
	textRect.centery = screen.get_rect().centery+24
	screen.blit(gameover_img, (0, 0))
	screen.blit(text, textRect)
else:
	pygame.font.init()
	font = pygame.font.Font(None, 24)
	text = font.render("Accuracy: "+accuracy+"%", True, (0,255,0))
	textRect = text.get_rect()
	textRect.centerx = screen.get_rect().centerx
	textRect.centery = screen.get_rect().centery+24
	screen.blit(youwin_img, (0,0))
	screen.blit(text, textRect)
while True:
	for event in pygame.event.get():
		if event.type == pygame.QUIT:
			pygame.quit()
			exit()
	pygame.display.flip()
