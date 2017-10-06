export default [
	{
		title: 'Welcome to Happo!',
		text: 'This is the position overview screen. Here you will see all the positions you have created or been invited to. <br/><br/>Positions are sorted into three different stacks and can be moved through stack by dragging and dropping.<br/><br/><span class="category-heading">Draft</span><br/>Shows you positions you are working on but yet have to open up for applications/receiving candidates.<br/><span class="category-heading">Open</span><br/>Shows you all ongoing jobs.<br/><span class="category-heading">Closed</span><br/>Here you’ll find all filled positions, positions on hold or positions that have been closed for other reasons.',
		selector: '.job-header',
		position: 'top',
		type: 'hover',
		style: {
			backgroundColor: '#fff',
			borderColor: '#fff',
		}
	},
	{
		title: 'Create a position',
		text: 'Click "add positions" to create your first job. Once you\'ve created it. Drag and drop it to the "Open" column to publish it.',
		selector: '.-add-position',
		position: 'bottom',
		style: {
			backgroundColor: '#fff',
			mainColor: '#000',
			beacon: {
				inner: '#000',
				outer: '#000'
			},
			skip: {
				color: '#000'
			},
			hole: {
				backgroundColor: 'RGBA(201, 23, 33, 0.2)',
			}
		}
	}
];