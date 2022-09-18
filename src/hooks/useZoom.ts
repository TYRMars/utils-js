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

/**
 * 获取边框限制的transform的x, y偏移量
 * innerDOM: 内盒子DOM
 * outerDOM: 边框盒子DOM
 * moveX: 盒子的x移动距离
 * moveY: 盒子的y移动距离
 */
const limitBorder = (innerDOM, outerDOM, moveX, moveY, multiple) => {
	let { clientWidth: innerWidth, clientHeight: innerHeight, offsetLeft: innerLeft, offsetTop: innerTop } = innerDOM
	let { clientWidth: outerWidth, clientHeight: outerHeight } = outerDOM
	let transX
	let transY
	// 放大的图片超出box时 图片最多拖动到与边框对齐
	if (innerWidth * multiple > outerWidth || innerHeight * multiple > outerHeight) {
		if (innerWidth * multiple > outerWidth && innerWidth * multiple > outerHeight) {
			transX = Math.min(Math.max(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
			transY = Math.min(Math.max(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
		} else if (innerWidth * multiple > outerWidth && !(innerWidth * multiple > outerHeight)) {
			transX = Math.min(Math.max(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
			transY = Math.max(Math.min(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
		} else if (!(innerWidth * multiple > outerWidth) && innerWidth * multiple > outerHeight) {
			transX = Math.max(Math.min(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
			transY = Math.min(Math.max(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
		}
	}
	// 图片小于box大小时 图片不能拖出边框
	else {
		transX = Math.max(Math.min(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
		transY = Math.max(Math.min(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
	}
	return { transX, transY }
}

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
		// cancel draggable
		ImgRef.draggable = false;
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