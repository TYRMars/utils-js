import React, { useRef, useEffect } from 'react';

interface ZoomData {
	scale: number;
	originScale: number;
	moveable: boolean;
	firstPointX: number;
	firstPointY: number;
	secondsPointX: number;
	secondsPointY: number;
}

const getDistance = function (start, stop) {
	return Math.hypot(stop.x - start.x, stop.y - start.y);
};

const useZoom = (ImgRef: HTMLImageElement) => {
	const zoomData = useRef<ZoomData>({
		scale: 1,
		originScale: 1,
		moveable: false,
		firstPointX: 0,
		firstPointY: 0,
		secondsPointX: 0,
		secondsPointY: 0,
	});

	useEffect(() => {
		const handleTouchStart = (event) => {
			event.preventDefault();

			const touches = event.touches;
			const PointFirst = touches[0];
			const PointSeconds = touches[1];

			zoomData.current = {
				...zoomData.current,
				moveble: true,
				firstPointX: PointFirst.pageX,
				firstPointY: PointFirst.pageY,
				originScale: zoomData.current.scale || 1,
			}

			if (PointSeconds) {
				zoomData.current = {
					...zoomData.current,
					secondsPointX: PointSeconds.pageX,
					secondsPointY: PointSeconds.pageY,
				}
			}
		}

		const handleTouchMove = (event) => {
			event.preventDefault();

			if (!zoomData.current.moveable) return;

			const touches = event.touches;
			const PointFirst = touches[0];
			const PointSeconds = touches[1];


		}

		const handleTouchEnd = () => {

		}

		const handleTouchCancel = () => {

		}

		ImgRef.addEventListener('touchstart', handleTouchStart, false);
		ImgRef.addEventListener('touchmove', handleTouchMove, false);
		ImgRef.addEventListener('touchend', handleTouchEnd, false);
		ImgRef.addEventListener('touchcancel', handleTouchCancel, false);
		return () => {
			ImgRef.removeEventListener('touchstart', handleTouchStart, false);
			ImgRef.removeEventListener('touchmove', handleTouchMove, false);
			ImgRef.removeEventListener('touchend', handleTouchEnd, false);
			ImgRef.removeEventListener('touchcancel', handleTouchCancel, false);
		}
	}, [])
}

export default useZoom;