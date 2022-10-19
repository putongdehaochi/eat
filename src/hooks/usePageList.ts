import { ref, watch } from "vue";
import { handleError } from "../utils";
import { filterParams, promiseCatcher } from "../utils";

//定义options 类型
type Options = {
	enablePullDownRefresh?: Boolean;
	enableReachBottom?: Boolean;
	params?: Record<string, any>;
	request: Promise;
};

const defaultParams = {
	page: 1,
	pageSize: 10,
};

export default function useQueryPage<T>(options: Options) {
	const dataList = ref<Array<T>>([]);
	const loading = ref(false);
	const noMore = ref(false);
	const pageSize = ref(10);
	const total = ref(0);
	const page = ref(1);
	//分页查询操作
	const getData = async (options) => {
		Taro.showLoading({
			title: "加载中",
		});

		const [err, res] = await promiseCatcher(
			request(
				_.assign(
					defaultParams,
					filterParams({ ...options.params, ...options })
				)
			)
		);

		if (err) handleError(err);
		page.value += page.value;
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
