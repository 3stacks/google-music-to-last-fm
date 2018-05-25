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

let totalTracks = [];

function getPlaysFromRenderedSongs(songTable, tracksSoFar) {
	const tBody = songTable.querySelector('tbody');
	let interval;
	let tracks = [];

	interval = setInterval(() => {
		const trackElements = Array.from(songTable.querySelectorAll('.song-row'));

		trackElements[trackElements.length - 1].scrollIntoView();

		if (tBody.dataset.endIndex === tBody.dataset.count) {
			clearInterval(interval);

			totalTracks = tracks.reduce((acc, curr) => {
				if (acc.includes(curr)) {
					return acc;
				}

				return [
					...acc,
					curr
				];
			}, []);

			totalTracks = totalTracks.reduce((acc, curr) => {
				const newStuff = new Array(curr.playCount).fill(curr.playData).join('\n');

				return `${acc}\n${newStuff}`;
			}, '');
		}

		tracks = [
			...tracks,
			...trackElements.reduce((acc, curr) => {
				const playCount = parseInt(getColumnContent(curr, 'play-count'), 10) || 0;

				if (playCount === 0) {
					return acc;
				} else {
					return [
						...acc,
						{
							playCount,
							playData: `"${getColumnContent(curr, 'artist')}","${getColumnContent(curr, 'title')}","${getColumnContent(curr, 'album')}","${new Date().toISOString()}","${getSecondDurationFromSongDuration(getColumnContent(curr, 'duration'))}"`
						}
					];
				}
			}, [])
		];
	}, 500);
}

const songTable = document.querySelector('.song-table');

getPlaysFromRenderedSongs(songTable);