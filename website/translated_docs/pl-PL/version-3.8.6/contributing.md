---
id: version-3.8.6-contributing
title: Współtworzenie Verdaccio
original_id: contributing
---

First of all 👏👏 thanks for visiting this page, for us means you are willing contribute to `verdaccio` and we are happy for that. Zapoznanie się z obcą podstawą kodowania nie jest łatwe, ale jesteśmy tutaj, aby Ci z tym pomóc.

## Kanały komunikacji

Jeżeli masz jakieś pytania, używamy dwóch kanałów do dyskusji:

* [Publiczny kanał Discord](http://chat.verdaccio.org/)

## Pierwsze kroki

Na pierwszy rzut oka verdaccio jest pojedyńczym repozytorium, lecz jest wiele sposobów, dzięki którym możesz z nami współpracować i wiele technik do przećwiczenia.

### Znajdowanie swojej mocnej strony

Wszyscy posiadamy różne umiejętności, więc zobaczmy w czym czujesz się komfortowo.

### Znam lub chcę się nauczyć Node.js

Node.js jest podstawą `verdaccio`, używamy bibliotek takich jak `express`, `commander`, `request` lub `async`. Verdaccio to w zasadzie Rest API, które tworzy komunikację z `npm` klientami zgodnymi, jak `yarn`.

Posiadamy długą [listę wtyczek](plugins.md) gotową do użycia oraz rozwijania, ale również możesz [stworzyć swoją własną](dev-plugins.md).

### Wolę pracować w interfejsie użytkownika

Recently we have moved to modern techonologies as `React` and `element-react`. We are looking forward to see new ideas how to improve the UI.

### I feel more confortable improving the stack

Of course, we will be happy to help us improving the stack, you can upgrade dependencies as `eslint`, `stylelint`, `webpack`. Mógłbyś jedynie poprawić `konfigurację` pakietu internetowego, byłoby świetnie. Wszelkie propozycje są mile widziane. Ponadto, jeśli masz doświadczenie z **Yeoman** możesz nam pomóc z [generatorem verdaccio](https://github.com/verdaccio/generator-verdaccio-plugin).

Tutaj jest kilka pomysłów:

* Utwórz wspólne reguły eslint, które będą używane we wszystkich zależnościach lub wtyczkach
* Ulepsz dostarczanie definicji typów Przepływu
* Przejście do Pakietu Internetowego 4
* Popraw szybkie ładowanie za pomocą Pakietu Internetowego
* Używamy babel i pakietu internetowego we wszystkich zależnościach, czemu więc nie zastosować wspólnego ustawienia?
* Popraw dostawę ciągłej integracji

### Robię świetne dokumentacje

Wiele współtwórców znajduje literówki i błędy gramatyczne, to również przyczynia się do ogólnego wrażenia podczas rozwiązywania problemów.

### Jestem projektantem

Mamy stronę frontendową <http://www.verdaccio.org/>, na której chętnie zobaczymy twoje pomysły.

Nasza strona internetowa jest oparta o [Docusaurus](https://docusaurus.io/).

### Jestem DevOps

Mamy bardzo popularny obraz Docker, [https://hub.docker.com/r/verdaccio/verdaccio](https://hub.docker.com/r/verdaccio/verdaccio/) który wymaga konserwacji i najprawdopodobniej ogromnych ulepszeń, potrzebujemy twojej wiedzy dla korzyści wszystkich użytkowników.

Wspieramy **Kubernetes**, **Puppet**, **Ansible** i **Chef** oraz potrzebujemy pomocy tych dziedzinach, nie krępuj się sprawdzić wszystkie repozytoria.

### Mogę tłumaczyć

Verdaccio chce być wielojęzyczny, w tym celu **mamy niesamowitą pomoc** ze strony serwisu [Crowdin](https://crowdin.com), który jest świetną platformą do tłumaczeń.

<img src="https://d3n8a8pro7vhmx.cloudfront.net/uridu/pages/144/attachments/original/1485948891/Crowdin.png" width="400px" />

Przygotowaliśmy projekt, w którym możesz wybrać swój ulubiony język, jeśli nie znalazłeś tam swojego języka, nie wahaj się powiadomić nas o tym poprzez [wysłanie zgłoszenia](https://github.com/verdaccio/verdaccio/issues/new).

[Przejdź do Verdaccio na platformie Crowdin](https://crowdin.com/project/verdaccio)

## Jestem gotowy do współtworzenia

Jeśli myślisz *"Widziałem już [repozytoria](repositories.md) i jestem gotów zacząć od razu"*, wtedy mam dla Ciebie dobrą wiadomość, która znajduje się w następnym kroku.

Będziesz potrzebował nauczyć się budować, [przygotowaliśmy dla ciebie poradnik](build.md).

Gdy zapoznasz się ze wszystkimi skryptami i będziesz wiedział jak ich używać, będziesz gotów do następnego kroku, uruchom [**Test jednostek**](test.md).

## Full list of contributors. We want to see your face here !

<a href="graphs/contributors"><img src="https://opencollective.com/verdaccio/contributors.svg?width=890&button=false" /></a>
