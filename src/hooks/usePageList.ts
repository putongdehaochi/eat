import Taro, { useReachBottom } from "@tarojs/taro";
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
	const dataList = ref([]) as any;
	const loading = ref(false);
	const noMore = ref(false);
	const pageSize = ref(10);
	const total = ref(0);
	const page = ref(1);
	//分页查询操作
	const getData = async (addParams?) => {
		Taro.showLoading({
			title: "加载中",
		});

		const [err, res] = await promiseCatcher(
			options.request(
				_.assign(
					defaultParams,
					filterParams({ ...options.params, ...addParams })
				)
			)
		);

		if (err) return handleError(err);
		Taro.hideLoading()

		page.value = _.get(res, "page");
		total.value = _.get(res, "total");
		dataList.value = _.concat(dataList.value, _.get(res, "results", []));
		noMore.value =
			page.value === _.ceil(_.get(res, "total") / pageSize.value);
	};

	const loadMore = () => {
		if (!noMore.value) {
			getData({ page: page.value + 1 });
		}
	};

	useReachBottom(() => {
		if (options.enableReachBottom) loadMore;
	});

	return {
		page,
		pageSize,
		total,
		dataList,
		getData,
		loadMore,
	};
}
