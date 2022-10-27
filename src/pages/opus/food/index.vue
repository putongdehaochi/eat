<template>
	<view :class="styles.container">
		<view :class="styles.eyebrow">
			<view :class="styles['eyebrow-eye']" @tap="onLike"
				><nut-icon
					font-class-name="iconfont"
					class-prefix="icon"
					color="#ff6188"
					name="smile"
				/>
			</view>
			<view :class="styles['eyebrow-eye']" @tap="onDislike"
				><nut-icon
					font-class-name="iconfont"
					class-prefix="icon"
					color="#ff6188"
					name="frown"
			/></view>
		</view>
		<view :class="styles.nose" @tap="() => dispatch('add')"
			>添加<nut-icon
				font-class-name="iconfont"
				class-prefix="icon"
				color="#ff6188"
				name="tianjia"
		/></view>
		<view v-if="status === 1">
			<view v-for="item in dataList" :key="item.id">
				<view :class="styles.block">
					<Action :data="item" />
				</view>
			</view>
		</view>
		<view v-else>
			<view v-for="item in dataList" :key="item.id">
				<view :class="styles.block">
					<Action :data="item" />
				</view>
			</view>
		</view>
	</view>
	<nut-dialog
		v-model:visible="visible"
		:title="curAction.title"
		@cancel="onCancel"
		@ok="onOk"
	>
		<template #default>
			<nut-input
				:defaultValue="curAction.defaultValue"
				v-if="curAction.showInput"
				v-model="inputName"
				:border="false"
				label=""
			/>
			<view v-else>是否删除{{ curAction.curValue }}?</view>
		</template>
		<template #footer>
			<view :class="styles.footer">
				<view :class="styles['footer-cancel']" @tap="onCancel"
					>取消</view
				>
				<view :class="styles['footer-ok']" @tap="onOk">确认</view>
			</view>
		</template>
	</nut-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { handleError, promiseCatcher } from "../../../utils";
import usePageList from "../../../hooks/usePageList";
import Action from '../components/action/Action';
import styles from "./index.module.scss";
import api from "../api";
import _ from "lodash";

const inputName = ref("");
const status = ref(1);
const likeList = ref([]);
const dislikeList = ref([]);
const visible = ref(false);
const curAction = ref({});
const { userId } = Taro.getStorageSync("user");

const { dataList, getData, noData, noMore } = usePageList({
	request: api.getFoodList,
	params: { userId, status: status.value },
	enableReachBottom: true,
	enablePullDownRefresh: true,
});

const onCancel = () => {
	visible.value = false;
};
const onOk = async () => {
	switch (curAction.action) {
		case "add":
			const [err, res] = await promiseCatcher(
				api.addFood({
					name: inputName.value,
					status: status.value,
					userId,
				})
			);
			if (err) return handleError(err);
			break;

		case "edit":
			const [err, res] = await promiseCatcher(
				api.editFood({
					name: inputName.value,
          id: curAction.id,
					userId,
				})
			);
			if (err) return handleError(err);
			break;

		case "delete":
			const [err, res] = await promiseCatcher(
				api.removeFood({
          id: curAction.id
					userId,
				})
			);
			if (err) return handleError(err);
			break;

		default:
			break;
	}
	getData();
	visible.value = false;
};

onMounted(async () => {
	getData();
	// getData({ userId, status: status.value });
});

const onLike = async () => {
	status.value = 1;
	getData();
	// getData({ userId, status: status.value });
};

const onDislike = async () => {
	status.value = 2;
	getData();
	// getData({ userId, status: status.value });
};

const dispatch = (action, name?, id?) => {
	const title =
		action === "add"
			? status === 1
				? "添加至喜欢"
				: "添加至不喜欢"
			: action === "edit"
			? "编辑"
			: "删除";
	const showInput = action === "delete" ? false : true;
	curAction.value = {
		action,
		title,
		showInput,
		defaultValue: action === "edit" ? name : "",
		curValue: name || "",
		id,
	};
	visible.value = true;
};
</script>
