# ProjektMVC - DOCKER
System monitorowania wydatków

#spis treści:

Funkcjonalnosci:
  1.1 Metoda GET.
  1.2 Metoda POST.
  1.3 Metoda PUT. 
  1.4 Metoda DELETE. 
  1.5 Zapis danych.

Instrukcja obsługi 
	2.1 Pakiety 
	2.2 Jak Uruchomić

Funkcjonalności:
	1.1 Metoda GET - żądanie HTTP do pobierania danych z jakiegoś zasobu, użytkownik pobiera z bazy danych iformacje o swoich wydatkach. 
	1.2 Metoda POST - żądanie HTTP do wysłania danych do zasobu, użytkownik ma możliwosc utworzenia i zapisu nowego wydatku. 
	1.3 Metoda PUT - żądanie HTTP do akutalizacji danych w danym zasobie informacji, użytkownik może zawsze edytkować każdą ceche swojego wydatku. 
	1.4 Metoda DELETE - żądanie HttP do usunięcia danych z zasobu, użytkownik może usunąc dany wydatek z bazy danych. 
	1.5 Zapis danych - aplikacja zapisuje dane w bazie danych w Postgresie.

2.Instrukcja obsługi:

2.1 Pakiety: 
- Express.js
- EJS 
- Method-override
- Nodemon

2.2 Jak uruchomić:
	W celu uruchomienia aplikacji należy wejsc w plik aplikacji i w terminalu wpisać "docker compose up", nastepnie aby przejść do strony kliknij na link wyświetlony w konsoli(domyślnie: "http://localhost3000").
