# Drupal module EDS API update – Kelson
# https://rally1.rallydev.com/#/detail/userstory/361019020768?fdp=true

# Improve new releases 18.x http://edswiki.ebscohost.com/EDS_API_Documentation

# my fork https://github.com/kelsonthony/edsapi-drupal8-plugin

# Setup Drupal Ubuntu

# apt-get update
# apt-get upgrade
# LAMP https://sempreupdate.com.br/como-instalar-do-lamp-no-ubuntu-18-04/
# apt-get install apache2
# dpkg -l apache2
# sudo chown -R vagrant:vagrant platform-core/


# ############# LAMP SETUP #################


# sudo apt update

# sudo apt upgrade -y

# sudo apt install -y apache2

# sudo apt install -y php php-cli php-common php-gd php-mbstring php-intl php-xml php-zip php-pear libapache2-mod-php

# cd /var/www/html

# nano test.php

# “<?php phpinfo(); ?>” and save file

# sudo service apache2 restart

# http://192.168.25.10/test.php

# sudo apt install -y mysql-server mysql-client php-mysql

# mysql -u root -p 
# your password

# SHOW DATABASES; 

# CREATE DATABASE meu_banco;

# deletar banco DROP DATABASE meu_banco;

# CREATE USER 'seu_usuario'@'192.168.25.10' IDENTIFIED BY 'sua_senha';
# CREATE USER 'user_drupal882'@'192.168.25.10' IDENTIFIED BY 'kyxxp2';

# GRANT ALL PRIVILEGES ON *.* TO 'seu_usuario'@'192.168.25.10' WITH GRANT OPTION;

# GRANT ALL PRIVILEGES ON *.* TO 'user_drupal882'@'192.168.25.10' WITH GRANT OPTION;

# FLUSH PRIVILEGES;

# sudo apt install -y phpmyadmin

# vi /etc/apache2/apache2.conf

# Insert the lines below

    Alias /phpmyadmin /usr/share/phpmyadmin
    <Directory /usr/share/phpmyadmin>
    Options Indexes FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
    </Directory>

# sudo service apache2 restart

# #############Setup Drupal #############

# sudo apt install -y curl taskel
# sudo apt install taskel install lamp-server
# sudo a2enmod rewrite
# sudo apt install php-fdomdocument php-gd
# sudo vi /etc/apache2/sites-enabled/000-default.conf

# check errors with tail -f error.log on /var/log/apache2
# apt install php-curl 
# sysmtemctl restart apache2
# apt-get install php7.0-soap  
# apt-get install php7.0-intl       
# phpenmod curl
#  apt install gedit -y      
# vi mods/available/curl.ini

# vi /etc/php/7.0/cli/php.ini  
# grep -r "soap.dll" /etc/php/7.0/cli/
# php -i | grep -i soap 

# apt-get dist-upgrade -y   


<Directory /var/www/html/drupal>
Options Indexes FollowSymLinks
AllowOverride All
</Directory>

# service apache2 restart

# #### Download Drupal ####
# curl --output /tmp/drupal.tar.gz https://ftp.drupal.org/files/projects/drupal-8.4.5.tar.gz

# New Version
# curl --output /tmp/drupal.tar.gz https://ftp.drupal.org/files/projects/drupal-8.8.2.tar.gz

# compactar pasta tar -czvf ebsco.tar.gz ebsco     

# sudo rm -fr /var/www/html
# sudo tar xf /tmp/drupal.tar.gz -C /var/www/html/drupal
# sudo chown -R www-data.www-data /var/www/html/drupal

# EDS API Credentials
# User: ebscoup
# Password: Acesso@2019
# Profile: cbuilder

# console EDS API
https://eds-api.ebscohost.com/Console

# EDS API Credentials PUCMG
# User: s6389449main
# Password: study4Todos#
# Profile: edsapi
# Update EDS API 
# http://edswiki.ebscohost.com/EDS_API_Documentation

# composer require ebsco/edsapi-drupal8-plugin


# Repository New Issue to Enhancement https://github.com/ebsco/edsapi-drupal8-plugin/issues

EBSCO Discovery Service API 18.7: Release Notes October 2018
EBSCO Discovery Service API 18.6: Release Notes September 2018
EBSCO Discovery Service API 18.5: Release Notes September 2018
EBSCO Discovery Service API 18.4: Release Notes September 2018
EBSCO Discovery Service API 18.3: Release Notes June 2018
EBSCO Discovery Service API 18.2: Release Notes April 2018
EBSCO Discovery Service API 18.1: Release Notes February 2018

## Quick image view

knee injury

processHtmlRecords
AN 142511983

To Retrieve Method
AN 5733336
39788101
Database ID: iqv

CSS
Alt/Title
detail records
Link 

http://kelsonthony/drupal/drupal-8.8.5/ebsco/image_quick_view?id=39788101|iqv


http://kelsonthony/drupal/drupal-8.8.5/ebsco/detailedrecord?id=142511983|aph



GET /edsapi/rest/ExportFormat?an=142511983&dbid=aph&format=ris Http/1.1 

http://kelsonthony/drupal/drupal-8.8.5/ebsco/exportFormat?id=142511983|aph&format=ris

http://kelsonthony/drupal/drupal-8.8.5/ebsco/exportformat?id=142511983|aph|format=ris

http://kelsonthony/drupal/drupal-8.8.5/ebsco/exportformat?id=142511983|aph&format=ris



kelsonthony/eds-api/edsapi-php-simple/edsapi-simple-php-sample/edsapi-simple-app.php?export=y&format=ris&an=142511983&db=aph

Citation Styles
AN 142511983
aph

abnt

Route
http://kelsonthony/drupal/drupal-8.8.5/ebsco/citation_styles?id=142511983|aph|all

http://kelsonthony/drupal/drupal-8.8.5/ebsco/citation_styles_detail?id=142511983|aph|all


ver

http://kelsonthony/drupal/drupal-8.8.5/ebsco/exportformat_detail?id=142511983%7Caph&format=ris

http://kelsonthony/drupal/drupal-8.8.5/ebsco/detailedrecord?id=142511983%7Caph

User: placarinfo
Password: YJhS$9PAV5VtDbpy



global-styling:
  version: 1.x
  css:
    theme:
      css/ebsco.css: {}
global-scripts:
    version: 1.x
    js:
      js/ebsco.js: {}
    dependencies:
      - core/jquery
      - core/jquery.once
      - core/drupal.dialog.ajax
      - core/jquery.form

# Autocomplete



http://kelsonthony/drupal/drupal-8.8.5/ebsco/autocomplete?term=te&idx=rawqueries&filters=
[{"name":"custid","values":"kelanthony"}]&token=hello

http://kelsonthony/drupal/drupal-8.8.5/ebsco/autocomplete?term=te&idx=rawqueries&filters=
%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22kelanthony%22%7D%5D&token=hello

http://kelsonthony/drupal/drupal-8.8.5/ebsco/autocomplete_detail?term=te&idx=rawqueries&filters=
%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22kelanthony%22%7D%5D&token=hello


https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete?term=te&idx=rawqueries&filters=
%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22kelanthony%22%7D%5D&token=hello


https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete?term=te&idx=rawqueries&filters=
%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22kelanthony%22%7D%5D&token=ARCfVpXXIuV0BlUHnA4brpYxh6tMqUrBubxvLowGnI5rRqSrVm7NFU71zqs8s1IvhcA=&format=json

http://Autocomplete01.ese.epnet.com:8080/Autocomplete/rest/Autocomplete?term=te&idx=rawqueries&filters=
%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22kelanthony%22%7D%5D&token=ARCfVpXXIuV0BlUHnA4brpYxh6tMqUrBubxvLowGnI5rRqSrVm7NFU71zqs8s1IvhcA=&format=json

http://kelsonthony/drupal/drupal-8.8.5/ebsco/%7B%22authenticationToken%22:%22AEZVpc5bFxpjZLs2gTyDKmeZPepRal-hjuN7IkN1c3RvbWVySWQiOiJrZWxhbnRob255IiwiR3JvdXBJZCI6ImRldiJ9%22,%22authenticationTimeout%22:1800,%22autocompleteUrl%22:%22https:////global.ac.ebsco-content.com//autocomplete//rest//autoComplete%22,%22autocompleteToken%22:%22ARBxLcG0v3XLB2F0uFCNT0lAWCmbLlk5//qjaRU1eHo8sYmrW6wujHfbIP0bSeoJxHfI=%22,%22autocompleteTokenTimeOut%22:1800,%22autocompleteCustId%22:%22kelanthony%22%7D


  'authenticationToken' => string 'AEacdae7VBtFRYTVXmwDHlSRlO5ZCF-ZujR7IkN1c3RvbWVySWQiOiJrZWxhbnRob255IiwiR3JvdXBJZCI6ImRldiJ9' (length=92)
  'authenticationTimeout' => int 1800
  'autocompleteUrl' => string 'https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete' (length=66)
  'autocompleteToken' => string 'ARBh639WDsSKnhd5jpw8qwv/zAfaUVDiMDFCV264nVX54pPP/jEEQcnQb6+k2h8v1G0=' (length=68)
  'autocompleteTokenTimeOut' => int 1800
  'autocompleteCustId' => string 'kelanthony' (length=10)



http://kelsonthony/drupal/drupal-8.8.5/ebsco/autocomplete

# checar a versão do jquery jQuery.fn.jquery


# Drupal 9

https://github.com/ebsco/edsapi-drupal8-plugin/issues/34





