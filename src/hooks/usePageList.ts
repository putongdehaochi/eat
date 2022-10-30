import Taro, { useReachBottom, usePullDownRefresh } from "@tarojs/taro";
import _ from "lodash";
import { ref, watch, onMounted } from "vue";
import { handleError } from "../utils";
import { filterParams, promiseCatcher } from "../utils";

//定义options 类型
type Options = {
	enablePullDownRefresh?: Boolean;
	enableReachBottom?: Boolean;
	params?: Record<string, any>;
	request: Promise<any>;
};

const defaultParams = {
	page: 1,
	pageSize: 10,
};

export default function usePageList<T>(options: Options) {
	const { enablePullDownRefresh = false, enableReachBottom = false } = options
	const dataList = ref([]) as any;
	const dataListCache = ref([]) as any;
	const cacheParams = ref({});
	const loading = ref(false);
	const noMore = ref(false);
	const noData = ref(false);
	const pageSize = ref(10);
	const total = ref(0);
	const page = ref(1);
	//分页查询操作
	const getData = async (addParams?) => {

		const assignParams = _.assign(
			defaultParams,
			filterParams({ ...options.params, ...addParams })
		)

		Taro.showLoading({
			title: "加载中",
		});

		const [err, res] = await promiseCatcher(
			options.request(assignParams)
		);

		if (err) return handleError(err);
		Taro.hideLoading()

		const resList = _.get(res, "results", [])

		page.value = _.get(assignParams, "page");
		const curList = page.value > 1 ? _.concat(dataListCache.value, resList) : resList;
		console.log(page.value);
		console.log(curList);
		dataListCache.value = curList
		total.value = _.get(res, "total");
		dataList.value = curList;
		noMore.value =
			page.value === _.ceil(_.get(res, "total") / pageSize.value);
		noData.value = _.size(curList) === 0;
		cacheParams.value = assignParams;
	};

	const refresh = (options?) => {
		getData({ ...cacheParams.value, ...options });
	};

	const loadMore = () => {
		if (!noMore.value) {
			refresh({ page: page.value + 1 });
		}
	};

	useReachBottom(() => {
		if (enableReachBottom) loadMore();
	});

	usePullDownRefresh(async () => {
		if (!enablePullDownRefresh) return
		setTimeout(() => {
			Taro.stopPullDownRefresh(); //停止当前页面下拉刷新
		}, 300);
		refresh()
	});

	return {
		page,
		pageSize,
		total,
		dataList,
		noMore,
		noData,
		getData,
		loadMore,
		refresh
	};
}
