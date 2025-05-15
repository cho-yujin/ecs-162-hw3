<script lang="ts">
  export type SidebarProps = {
    title: string;
    visible: boolean;
  };

  const props: SidebarProps = $props();
</script>

<div class="sidebar">
    {props.visible}
</div>