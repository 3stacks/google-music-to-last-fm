# Google Play Music to Last.FM

## This is a WIP

## Getting your Google Play Data

- Go to https://play.google.com/music and open your console.
- Run the below command

```
function getColumnContent(row, columnName) {
    const column = row.querySelector(`[data-col="${columnName}"]`);

    if (column) {
        return column.textContent.trim();
    } else {
        return '';
    }
}

function getSecondDurationFromSongDuration(duration) {
    if (duration !== '') {
        const splitDuration = duration.split(':');
        const minutesAsSeconds = parseInt(splitDuration[0], 10) * 60;
        const parsedSeconds = parseInt(splitDuration[1], 10);

        return `${minutesAsSeconds + parsedSeconds}`;
    }

    return 0;
}

Array.from(document.querySelector('.song-table').querySelectorAll('.song-row')).map(song => {
    const playCount = parseInt(getColumnContent(song, 'play-count'), 10) || 0;

    if (playCount === 0) {
        return '';
    } else {
        return new Array(playCount).fill(`"${getColumnContent(song, 'artist')}","${getColumnContent(song, 'title')}","${getColumnContent(song, 'album')}","${new Date().toISOString()}","${getSecondDurationFromSongDuration(getColumnContent(song, 'duration'))}"`).join('\n');
    }
}).join('\n');
```