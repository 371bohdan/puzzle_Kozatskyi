const fs = require('fs');

// Зчитування файлу
fs.readFile('puzl.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Помилка при читанні файлу:', err);
        return;
    }

    // Розбиваємо дані на масив чисел (кожен рядок - одне число)
    const numbers = data.split('\n').map(line => line.trim()).filter(Boolean);

    // Функція для пошуку найбільшого ланцюжка
    function buildLongestSequence(numbers) {
        let maxSequence = '';
        let used = Array(numbers.length).fill(false);

        function dfs(currentSequence, currentEnd) {
            let extended = false;

            for (let i = 0; i < numbers.length; i++) {
                if (used[i]) continue;

                const number = numbers[i];
                if (number.startsWith(currentEnd)) {
                    used[i] = true;
                    dfs(currentSequence + number.slice(2), number.slice(-2));
                    used[i] = false;
                    extended = true;
                }
            }

            if (!extended && currentSequence.length > maxSequence.length) {
                maxSequence = currentSequence;
            }
        }

        for (let i = 0; i < numbers.length; i++) {
            used[i] = true;
            dfs(numbers[i], numbers[i].slice(-2));
            used[i] = false;
        }

        return maxSequence;
    }

    const result = buildLongestSequence(numbers);
    console.log('Найбільший ланцюжок:', result);

    // Запис результату у файл result.txt
    fs.writeFile('result.txt', result, (err) => {
        if (err) {
            console.error('Помилка при записі у файл:', err);
        } else {
            console.log('Результат успішно записано у файл result.txt');
        }
    });
});
